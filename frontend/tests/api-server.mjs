// Starts the unchanged backend against a disposable database, never backend/.env.
import { randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import mongoose from '../../backend/node_modules/mongoose/index.js'
import { MongoMemoryServer } from '../../backend/node_modules/mongodb-memory-server/index.js'
import { createApp } from '../../backend/app.js'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = randomBytes(48).toString('hex')
process.env.FRONTEND_URL = 'http://127.0.0.1:5174'
process.env.TRUST_PROXY = '0'
const mongo = await MongoMemoryServer.create({ binary: { downloadDir: fileURLToPath(new URL('../../backend/node_modules/.cache/mongodb-memory-server', import.meta.url)) } })
await mongoose.connect(mongo.getUri())
// Separate application instances isolate each suite's real rate-limit quota.
// Both retain the unchanged production middleware and use only this disposable DB.
const servers = [5099, 5100].map(port => createApp().listen(port, '127.0.0.1'))
async function shutdown() {
  await Promise.all(servers.map(server => new Promise(resolve => server.close(resolve))))
  await mongoose.disconnect()
  await mongo.stop()
  process.exit(0)
}
process.once('SIGTERM', shutdown)
process.once('SIGINT', shutdown)
