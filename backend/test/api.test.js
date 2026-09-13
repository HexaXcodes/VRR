import { before, after, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createApp } from '../app.js'
import Lead from '../models/Lead.js'
import User from '../models/User.js'
import Enquiry from '../models/Enquiry.js'
import { migrateEnquiries } from '../services/migrationService.js'
import { reportingBoundaries } from '../controllers/dashboardController.js'

let mongo, app, admin, counsellor, adminToken, counsellorToken
const password = randomBytes(24).toString('hex')
const leadInput = { studentName: 'Test Student', phone: '91 9876543210', currentClass: '10', interestedStream: 'PCMB', targetExam: 'NEET' }
const tokenFor = user => jwt.sign({ passwordVersion: user.updatedAt.getTime() }, process.env.JWT_SECRET, {
  subject: user.id, issuer: 'vrr-academy', audience: 'vrr-admin', expiresIn: '1h',
})
before(async () => {
  process.env.NODE_ENV = 'test'
  process.env.JWT_SECRET = randomBytes(48).toString('hex')
  process.env.FRONTEND_URL = 'http://localhost:5173,https://academy.example'
  process.env.TRUST_PROXY = '0'
  mongo = await MongoMemoryServer.create()
  await mongoose.connect(mongo.getUri())
  await Promise.all([Lead.init(), User.init()])
  const passwordHash = await bcrypt.hash(password, 12)
  admin = await User.create({ name: 'Test Admin', email: 'admin@example.test', passwordHash, role: 'admin' })
  counsellor = await User.create({ name: 'Test Counsellor', email: 'counsellor@example.test', passwordHash, role: 'counsellor' })
  adminToken = tokenFor(admin)
  counsellorToken = tokenFor(counsellor)
}, { timeout: 180000 })
beforeEach(async () => {
  app = createApp()
  await Lead.deleteMany({})
  await Enquiry.deleteMany({})
})
after(async () => { await mongoose.disconnect(); await mongo?.stop() })
const auth = (req, token = adminToken) => req.set('Authorization', `Bearer ${token}`)
const seed = () => Lead.create(leadInput)

test('public creation normalizes phones, keeps safe response, records activity', async () => {
  for (const phone of ['9876543210', '+919876543210', '91 9876543210', '98765 43210']) {
    const res = await request(app).post('/api/leads').send({ ...leadInput, phone })
    assert.equal(res.status, 201)
    assert.deepEqual(Object.keys(res.body.data).sort(), ['_id', 'createdAt', 'requestType', 'studentName'])
    const lead = await Lead.findById(res.body.data._id)
    assert.equal(lead.phone, '+919876543210')
    assert.equal(lead.status, 'new')
    assert.equal(lead.activity[0].message, 'Lead created')
  }
})
test('legacy and actual Contact form course values remain supported', async () => {
  for (const course of ['Foundation', 'JEE', 'NEET', 'PCMB', 'PCMC', 'PCME', 'PU Integrated Program']) {
    const res = await request(app).post('/api/enquiry').send({ name: 'Existing Student', phone: '9876543210', class: '10', board: 'State', course, message: '' })
    assert.equal(res.status, 201, JSON.stringify(res.body))
    const lead = await Lead.findById(res.body.data._id)
    assert.equal(lead.currentClass, '10')
    assert.equal(lead.targetExam, ['JEE', 'NEET'].includes(course) ? course : 'Undecided')
    assert.equal(lead.interestedStream, ['PCMB', 'PCMC', 'PCME'].includes(course) ? course : 'Undecided')
  }
})
test('invalid input, enums, dates and public internal fields rejected', async () => {
  const invalid = [
    { studentName: 'A' }, { phone: '123' }, { email: 'bad-email' }, { currentClass: '8' },
    { status: 'admitted' }, { notes: [] }, { campusVisit: { status: 'completed' } },
    { campusVisit: { preferredDate: '2027-02-30' } }, { targetExam: 'INVALID' },
  ]
  for (const input of invalid) {
    const res = await request(app).post('/api/leads').send({ ...leadInput, ...input })
    assert.equal(res.status, 400, JSON.stringify(input))
    assert.equal(res.body.success, false)
    assert.ok(Array.isArray(res.body.errors))
  }
})
test('all request types and convenience endpoints use common creation', async () => {
  for (const requestType of ['general_enquiry', 'fee_structure', 'campus_visit', 'counselling', 'admission']) {
    const res = await request(app).post('/api/leads').send({ ...leadInput, requestType })
    assert.equal(res.status, 201)
    const lead = await Lead.findById(res.body.data._id)
    assert.equal(lead.campusVisit.requested, requestType === 'campus_visit')
    assert.equal(lead.counselling.requested, requestType === 'counselling')
  }
  for (const path of ['fee-structure', 'campus-visit', 'counselling']) {
    const res = await request(app).post(`/api/leads/${path}`).send(leadInput)
    assert.equal(res.status, 201)
    assert.equal(res.body.data.requestType, path.replaceAll('-', '_'))
  }
})
test('login succeeds and never exposes password hash', async () => {
  const res = await request(app).post('/api/admin/auth/login').send({ email: 'ADMIN@example.test', password })
  assert.equal(res.status, 200)
  assert.ok(res.body.data.token)
  assert.equal(res.body.data.user.role, 'admin')
  assert.ok(!JSON.stringify(res.body).includes('passwordHash'))
  assert.equal((await auth(request(app).get('/api/admin/leads'), res.body.data.token)).status, 200)
  assert.ok((await User.findById(admin.id)).lastLogin)
})
test('login failure does not disclose account existence', async () => {
  const existing = await request(app).post('/api/admin/auth/login').send({ email: admin.email, password: 'wrong' })
  const missing = await request(app).post('/api/admin/auth/login').send({ email: 'missing@example.test', password: 'wrong' })
  assert.equal(existing.status, 401)
  assert.deepEqual(existing.body, missing.body)
})
test('all admin routes require authentication and legacy CRUD is retired', async () => {
  const id = new mongoose.Types.ObjectId()
  for (const [method, path] of [['get', '/api/admin/leads'], ['get', `/api/admin/leads/${id}`], ['patch', `/api/admin/leads/${id}`], ['delete', `/api/admin/leads/${id}`], ['post', `/api/admin/leads/${id}/notes`], ['get', '/api/admin/dashboard']]) {
    assert.equal((await request(app)[method](path)).status, 401)
  }
  for (const [method, path] of [['get', '/api/enquiry'], ['get', `/api/enquiry/${id}`], ['put', `/api/enquiry/${id}`], ['delete', `/api/enquiry/${id}`], ['get', '/api/leads']]) assert.equal((await request(app)[method](path)).status, 404)
})
test('admin listing supports filters, pagination, escaped search, safe assignment', async () => {
  await seed()
  await Lead.create({ ...leadInput, studentName: 'Another Student', interestedStream: 'PCMC', status: 'contacted', assignedCounsellor: counsellor._id })
  const res = await auth(request(app).get('/api/admin/leads?status=contacted&interestedStream=PCMC&limit=1&page=1'))
  assert.equal(res.status, 200)
  assert.equal(res.body.data.pagination.total, 1)
  assert.equal(res.body.data.items[0].assignedCounsellor.name, counsellor.name)
  assert.equal(res.body.data.items[0].notes, undefined)
  assert.equal((await auth(request(app).get('/api/admin/leads?search=.*'))).body.data.pagination.total, 0)
  assert.equal((await auth(request(app).get('/api/admin/leads?limit=101'))).status, 400)
  assert.equal((await auth(request(app).get('/api/admin/leads?from=2027-03-01&to=2027-02-01'))).status, 400)
})
test('counsellor can manage leads but cannot delete; admin can delete', async () => {
  const lead = await seed()
  assert.equal((await auth(request(app).get('/api/admin/leads'), counsellorToken)).status, 200)
  assert.equal((await auth(request(app).delete(`/api/admin/leads/${lead.id}`), counsellorToken)).status, 403)
  assert.ok(await Lead.exists({ _id: lead.id }))
  assert.equal((await auth(request(app).delete(`/api/admin/leads/${lead.id}`))).status, 200)
  assert.equal((await auth(request(app).get(`/api/admin/leads/${lead.id}`))).status, 404)
})
test('status, follow-up and assignment changes append activity; nested patch preserves fields', async () => {
  const lead = await seed()
  const path = `/api/admin/leads/${lead.id}`
  const res = await auth(request(app).patch(path)).send({
    status: 'contacted', assignedCounsellor: counsellor.id, followUpDate: '2027-01-05T10:00:00Z',
    campusVisit: { preferredDate: '2027-01-06T10:00:00Z', timeSlot: 'morning', status: 'scheduled', requested: true },
  })
  assert.equal(res.status, 200, JSON.stringify(res.body))
  assert.ok(res.body.data.activity.some(a => a.message === 'Status changed from new to contacted'))
  assert.ok(res.body.data.activity.some(a => a.message === 'Counsellor assigned'))
  assert.ok(res.body.data.activity.every(a => a.performedBy === admin.id))
  const updated = await auth(request(app).patch(path)).send({ campusVisit: { status: 'completed' } })
  assert.equal(updated.body.data.campusVisit.timeSlot, 'morning')
  assert.equal((await auth(request(app).patch(path)).send({ activity: [] })).status, 400)
  assert.equal((await auth(request(app).patch(path)).send({ followUpDate: 'garbage' })).status, 400)
  assert.equal((await auth(request(app).patch(path)).send({ assignedCounsellor: admin.id })).status, 400)
})
test('notes record author and activity; empty notes rejected', async () => {
  const lead = await seed()
  const path = `/api/admin/leads/${lead.id}/notes`
  const res = await auth(request(app).post(path), counsellorToken).send({ text: '  Parent called  ' })
  assert.equal(res.status, 201)
  assert.equal(res.body.data.text, 'Parent called')
  assert.equal(res.body.data.createdBy, counsellor.id)
  const stored = await Lead.findById(lead.id)
  assert.equal(stored.activity.at(-1).type, 'note_added')
  assert.equal((await auth(request(app).post(path)).send({ text: '   ' })).status, 400)
  const detail = await auth(request(app).get(`/api/admin/leads/${lead.id}`))
  assert.equal(detail.body.data.notes[0].createdBy.name, counsellor.name)
  assert.ok(!JSON.stringify(detail.body).includes('passwordHash'))
})
test('dashboard returns counts, zero-filled groups and at most five recent leads', async () => {
  for (const status of ['new', 'contacted', 'counselling_scheduled', 'campus_visit_scheduled', 'application_started', 'admitted', 'lost']) await Lead.create({ ...leadInput, status })
  const res = await auth(request(app).get('/api/admin/dashboard'))
  assert.equal(res.status, 200)
  const d = res.body.data
  assert.equal(d.totalLeads, 7)
  for (const key of ['newLeads', 'contacted', 'counsellingScheduled', 'campusVisits', 'applicationsStarted', 'admitted', 'lost']) assert.equal(d[key], 1)
  for (const key of ['today', 'thisWeek', 'thisMonth']) assert.equal(d[key], 7)
  assert.deepEqual(d.byStream, { PCMB: 7, PCMC: 0, PCME: 0, Undecided: 0 })
  assert.equal(d.byTargetExam.NEET, 7)
  assert.equal(d.bySource.website, 7)
  assert.equal(d.recentLeads.length, 5)
  const boundary = reportingBoundaries(new Date('2027-01-03T20:00:00Z'))
  assert.equal(boundary.today.toISOString(), '2027-01-03T18:30:00.000Z')
  assert.equal(boundary.thisWeek.toISOString(), '2027-01-03T18:30:00.000Z')
})
test('invalid IDs, injection, malformed JSON, oversized bodies and CORS handled', async () => {
  assert.equal((await auth(request(app).get('/api/admin/leads/not-an-id'))).status, 400)
  assert.equal((await request(app).post('/api/leads').send({ ...leadInput, phone: { $ne: null } })).status, 400)
  assert.equal((await auth(request(app).get('/api/admin/leads?status[$ne]=new'))).status, 400)
  assert.equal((await request(app).post('/api/leads').set('Content-Type', 'application/json').send('{')).status, 400)
  assert.equal((await request(app).post('/api/leads').send({ ...leadInput, message: 'x'.repeat(11000) })).status, 413)
  assert.equal((await request(app).get('/api/status').set('Origin', 'https://evil.example')).status, 403)
  const allowed = await request(app).get('/api/status').set('Origin', 'https://academy.example')
  assert.equal(allowed.headers['access-control-allow-origin'], 'https://academy.example')
  assert.ok(allowed.headers['x-content-type-options'])
})
test('rate limits share public aliases and restrict login attempts', async () => {
  for (let i = 0; i < 10; i++) assert.equal((await request(app).post(i % 2 ? '/api/enquiry' : '/api/leads').send(leadInput)).status, 201)
  assert.equal((await request(app).post('/api/leads/counselling').send(leadInput)).status, 429)
  for (let i = 0; i < 5; i++) assert.equal((await request(app).post('/api/admin/auth/login').send({ email: admin.email, password: 'wrong' })).status, 401)
  assert.equal((await request(app).post('/api/admin/auth/login').send({ email: admin.email, password })).status, 429)
})
test('expired, invalid, inactive and reset-user tokens rejected', async () => {
  assert.equal((await auth(request(app).get('/api/admin/leads'), 'invalid')).status, 401)
  const expired = jwt.sign({}, process.env.JWT_SECRET, { subject: admin.id, expiresIn: -1, issuer: 'vrr-academy', audience: 'vrr-admin' })
  assert.equal((await auth(request(app).get('/api/admin/leads'), expired)).status, 401)
  const user = await User.create({ name: 'Temporary User', email: 'temporary@example.test', passwordHash: await bcrypt.hash(password, 4), role: 'counsellor' })
  const token = tokenFor(user)
  await User.updateOne({ _id: user.id }, { isActive: false })
  assert.equal((await auth(request(app).get('/api/admin/leads'), token)).status, 401)
  await User.updateOne({ _id: user.id }, { isActive: true })
  assert.equal((await auth(request(app).get('/api/admin/leads'), token)).status, 401)
})
test('migration is idempotent, maps status, preserves originals and timestamps', async () => {
  const createdAt = new Date('2024-01-01T00:00:00Z')
  await Enquiry.collection.insertMany([
    { name: 'Legacy Student', phone: '9876543210', class: '10', course: 'NEET', status: 'enrolled', createdAt, updatedAt: createdAt },
    { name: 'Invalid Student', phone: 'invalid', class: '10', course: 'JEE', status: 'new' },
  ])
  assert.deepEqual(await migrateEnquiries(() => {}), { scanned: 2, migrated: 1, skipped: 0, failed: 1 })
  assert.deepEqual(await migrateEnquiries(() => {}), { scanned: 2, migrated: 0, skipped: 1, failed: 1 })
  assert.equal(await Enquiry.countDocuments(), 2)
  const lead = await Lead.findOne()
  assert.equal(lead.status, 'admitted')
  assert.equal(lead.targetExam, 'NEET')
  assert.equal(lead.createdAt.toISOString(), createdAt.toISOString())
})
test('empty dashboard returns zero counts and no recent leads', async () => {
  const res = await auth(request(app).get('/api/admin/dashboard'))
  assert.equal(res.body.data.totalLeads, 0)
  assert.equal(res.body.data.today, 0)
  assert.deepEqual(res.body.data.recentLeads, [])
  assert.ok(Object.values(res.body.data.bySource).every(value => value === 0))
})
test('concurrent edits cannot silently overwrite notes or status', async () => {
  const lead = await seed()
  const first = await Lead.findById(lead.id)
  const second = await Lead.findById(lead.id)
  first.status = 'contacted'
  await first.save()
  second.notes.push({ text: 'Concurrent note', createdBy: admin.id })
  await assert.rejects(second.save(), { name: 'VersionError' })
  assert.equal((await Lead.findById(lead.id)).status, 'contacted')
})
test('create-admin command provisions and safely resets the same account', async () => {
  const email = 'bootstrap@example.test'
  const run = async () => {
    const child = spawn(process.execPath, ['scripts/create-admin.js'], {
      cwd: process.cwd(), windowsHide: true,
      env: { ...process.env, MONGODB_URI: mongo.getUri(), ADMIN_NAME: 'Bootstrap Admin', ADMIN_EMAIL: email, ADMIN_PASSWORD: password },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    child.stdout.on('data', chunk => { output += chunk })
    child.stderr.on('data', chunk => { output += chunk })
    const [code] = await once(child, 'exit')
    assert.equal(code, 0, output)
    assert.ok(!output.includes(password))
  }
  await run()
  const user = await User.findOne({ email }).select('+passwordHash')
  assert.equal(user.role, 'admin')
  assert.ok(await bcrypt.compare(password, user.passwordHash))
  const oldToken = tokenFor(user)
  await run()
  assert.equal(await User.countDocuments({ email }), 1)
  assert.equal((await auth(request(app).get('/api/admin/leads'), oldToken)).status, 401)
})
test('actual server entrypoint starts, connects, serves HTTP and shuts down', async () => {
  const child = spawn(process.execPath, ['server.js'], { cwd: process.cwd(), env: { ...process.env, MONGODB_URI: mongo.getUri(), PORT: '0' }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] })
  let output = ''
  child.stdout.on('data', chunk => { output += chunk })
  child.stderr.on('data', chunk => { output += chunk })
  try {
    const deadline = Date.now() + 15000
    while (!output.includes('VRR Academy API listening') && child.exitCode === null && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 100))
    assert.match(output, /MongoDB connected/)
    assert.match(output, /VRR Academy API listening/)
    const port = output.match(/listening on (\d+)/)[1]
    const health = await fetch(`http://127.0.0.1:${port}/api/health`)
    assert.equal(health.status, 200)
    assert.equal((await health.json()).data.status, 'ready')
    const lead = await fetch(`http://127.0.0.1:${port}/api/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadInput) })
    assert.equal(lead.status, 201)
  } finally {
    child.kill()
    if (child.exitCode === null) await once(child, 'exit')
  }
})
