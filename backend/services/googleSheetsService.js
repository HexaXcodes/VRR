import jwt from 'jsonwebtoken'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'
const TOKEN_TIMEOUT_MS = 10000
const APPEND_TIMEOUT_MS = 10000

let cachedAccessToken
let cachedAccessTokenExpiresAt = 0

export function isGoogleSheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_SHEET_ID,
  )
}

function serviceAccountPrivateKey() {
  return process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
}

async function getAccessToken() {
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt - 60000) return cachedAccessToken

  const issuedAt = Math.floor(Date.now() / 1000)
  const assertion = jwt.sign({
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    iat: issuedAt,
    exp: issuedAt + 3600,
  }, serviceAccountPrivateKey(), { algorithm: 'RS256' })

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
    signal: AbortSignal.timeout(TOKEN_TIMEOUT_MS),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok || !result.access_token) {
    throw new Error(`Google OAuth token request failed (${response.status}): ${result.error_description || result.error || 'unknown error'}`)
  }

  cachedAccessToken = result.access_token
  cachedAccessTokenExpiresAt = Date.now() + (Number(result.expires_in) || 3600) * 1000
  return cachedAccessToken
}

function sheetRange() {
  const tab = (process.env.GOOGLE_SHEET_TAB || 'Leads').replace(/'/g, "''")
  return `'${tab}'!A:V`
}

export async function appendLeadToGoogleSheet(lead) {
  if (!isGoogleSheetsConfigured()) throw new Error('Google Sheets integration is not configured')

  const accessToken = await getAccessToken()
  const spreadsheetId = encodeURIComponent(process.env.GOOGLE_SHEET_ID)
  const range = encodeURIComponent(sheetRange())
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ majorDimension: 'ROWS', values: [[
      String(lead._id || lead.id || ''),
      lead.createdAt ? new Date(lead.createdAt).toISOString() : new Date().toISOString(),
      lead.studentName || '',
      lead.parentName || '',
      lead.phone || '',
      lead.whatsapp || '',
      lead.email || '',
      lead.requestType || '',
      lead.currentClass || '',
      lead.board || '',
      lead.interestedStream || '',
      lead.targetExam || '',
      lead.preferredCampus || '',
      lead.school || '',
      lead.preferredContactTime || '',
      lead.message || '',
      lead.status || '',
      lead.leadSource || '',
      Boolean(lead.campusVisit?.requested),
      lead.campusVisit?.preferredDate ? new Date(lead.campusVisit.preferredDate).toISOString() : '',
      lead.campusVisit?.timeSlot || '',
      Boolean(lead.counselling?.requested),
    ]] }),
    signal: AbortSignal.timeout(APPEND_TIMEOUT_MS),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(`Google Sheets append failed (${response.status}): ${result.error?.message || 'unknown error'}`)
  }
}
