# VRR admissions CRM API — Phase 1

Base URL: `http://localhost:5000/api`. Node.js 20.19+ recommended; this implementation is tested on Node 24. MongoDB remains the database. No admin UI is included in Phase 1.

## Local setup

From `backend`:

1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI` to a local MongoDB or Atlas database.
4. Generate a secret with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` and put it in `JWT_SECRET`.
5. Set `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` and run `npm run create-admin`.
6. Run `npm run dev` (watch mode) or `npm start`.

The admin password must be at least 12 characters and at most 72 UTF-8 bytes. The operator-only script creates or resets an admin with that email, activates the account, hashes with bcrypt cost 12, and invalidates existing tokens for that user. It does not print credentials. Remove bootstrap credentials from the deployed environment after provisioning. There is deliberately no public registration or user-provisioning HTTP endpoint. Counsellors are provisioned by a trusted database operator using the User model and a bcrypt hash; never store a plain password.

Start the existing frontend from `frontend` with `npm install` then `npm run dev`. Its optional `VITE_API_URL` is the backend base including `/api`. The Contact form submits to `/api/leads`; no visual changes were made.

## Environment

| Variable | Purpose |
| --- | --- |
| PORT | HTTP port, default 5000 |
| NODE_ENV | development, test, or production |
| MONGODB_URI | MongoDB connection string; required in production |
| FRONTEND_URL | Comma-separated allowed browser origins, e.g. `https://vrr.example,https://www.vrr.example`; no trailing slashes; required in production |
| JWT_SECRET | Random secret, at least 32 bytes; required in all environments |
| JWT_EXPIRES_IN | Positive duration with unit s/m/h/d, default `8h` |
| ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD | Operator-only bootstrap/reset script inputs |
| TRUST_PROXY | Exact trusted reverse-proxy hop count; default 0 (direct connection) |

Use HTTPS in production. Configure TRUST_PROXY to match the actual deployment; do not blindly trust forwarded IP headers. Limits use process memory: Phase 1 assumes one API instance. Multiple instances require a shared rate-limit store or gateway limit. CORS permits requests without Origin for non-browser clients; authentication still protects internal routes.

## Responses and errors

Success:
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "studentName": "Ananya Rao",
    "requestType": "general_enquiry",
    "createdAt": "2027-01-10T10:00:00.000Z"
  }
}
```

Failure:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{"field": "phone", "message": "Enter a valid Indian mobile number"}]
}
```

Codes: 400 invalid input/ID, 401 missing/invalid/expired authentication, 403 insufficient role or disallowed browser origin, 404 missing route/record, 409 duplicate or concurrent edit conflict (reload and retry), 413 body too large, 429 rate limit, 500 generic server error. Validation responses omit submitted values. JSON/form bodies are limited to 10 KB. MongoDB operator/dotted keys are rejected; search regex metacharacters are escaped. Free text is stored as text, so future admin interfaces must render it as text rather than raw HTML.

## Authentication

`POST /admin/auth/login`
```json
{"email":"staff@example.com","password":"your-provisioned-password"}
```
Returns:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt>",
    "user": {"_id":"507f1f77bcf86cd799439012","name":"Admissions Admin","email":"staff@example.com","role":"admin"}
  }
}
```

Pass `Authorization: Bearer <jwt>` to every admin endpoint. Tokens use HS256 with issuer/audience verification; active User records are reloaded on every request. Changes to the user record invalidate older tokens; recording lastLogin alone does not. Password hashes are excluded from all API responses. Failed login uses the same 401 message for unknown email, wrong password, and inactive accounts. Login is limited to 5 requests per 15 minutes per IP, including successful requests. Tokens are not persisted by the public frontend.

## Public lead capture

- `POST /leads`
- `POST /leads/fee-structure` (forces fee_structure)
- `POST /leads/campus-visit` (forces campus_visit)
- `POST /leads/counselling` (forces counselling)
- `POST /enquiry` (temporary legacy submission alias)

All share one limit of 10 requests per 15 minutes per IP, including validation failures. There is no public listing, detail, update, or delete endpoint.

```json
{
  "studentName": "Ananya Rao",
  "parentName": "Meera Rao",
  "phone": "91 9876543210",
  "whatsapp": "+919876543210",
  "email": "parent@example.com",
  "currentClass": "10",
  "board": "CBSE",
  "school": "Example School",
  "interestedStream": "PCMB",
  "targetExam": "NEET",
  "requestType": "campus_visit",
  "leadSource": "website",
  "preferredCampus": "VRR Academy",
  "preferredContactTime": "After 5 PM",
  "message": "Please explain the integrated programme.",
  "campusVisit": {"preferredDate":"2027-01-15T05:30:00Z","timeSlot":"morning"}
}
```

Required: studentName (trimmed, 2–100 chars), phone. Other fields are optional. Indian mobile numbers beginning 6–9 accept 10 digits, +91/91 prefixes, whitespace, parentheses and hyphens; stored as `+919876543210`. WhatsApp follows the same rules. Supplied email must be valid and is lowercased. Omit optional email/phone fields rather than sending empty strings.

Limits: parentName 100, school 150, preferredContactTime 150, message 1000. Dates must be valid ISO 8601 strings; use explicit timezone offsets for timestamps.

| Field | Values / default |
| --- | --- |
| currentClass | 9, 10, 11, 12, other; default other |
| board | CBSE, ICSE, State, IGCSE, Other, Unknown; default Unknown |
| interestedStream | PCMB, PCMC, PCME, Undecided; default Undecided |
| targetExam | NEET, JEE, KCET, Boards, Multiple, Undecided; default Undecided |
| requestType | general_enquiry, fee_structure, campus_visit, counselling, admission; default general_enquiry |
| leadSource | website, whatsapp, instagram, google, referral, walk_in, other; default website |
| preferredCampus | VRR Academy, Shanthi Niketan, No Preference; default No Preference |
| status (internal only) | new, contacted, counselling_scheduled, campus_visit_scheduled, application_started, admitted, lost; default new |

Creation records “Lead created”. Campus visit requests (or supplied campusVisit preferences) set campusVisit.requested=true and status=requested. Counselling requests do the same for counselling. Public callers cannot set pipeline status, assignments, notes, activity, follow-ups, or internal appointment statuses. Public responses contain only ID, studentName, requestType, createdAt.

### Temporary legacy compatibility

Both public submission endpoints accept:
```json
{"name":"Ananya Rao","phone":"9876543210","class":"10","board":"State","course":"PCMB","message":""}
```

`middleware/legacyEnquiry.js` maps name → studentName and class → currentClass. Canonical fields take precedence when both exist.

- JEE / NEET course → matching targetExam.
- Foundation → targetExam Undecided.
- Existing redesigned form values PCMB / PCMC / PCME → interestedStream, targetExam Undecided.
- PU Integrated Program → interestedStream and targetExam Undecided.
- Default requestType general_enquiry and leadSource website.

Remove this adapter, legacy validation fields, and the POST-only enquiry route after all clients send canonical Lead payloads. Keep migration mapping available for archived data. Historical GET/PUT/DELETE enquiry endpoints return 404; compatibility never restores public CRUD. The unused frontend listing/detail helpers were removed after confirming they had no callers.

## Internal lead management

Both admin and counsellor roles can read and manage all leads. Assignment is organisational, not row-level access control. Only admins can delete.

| Method | Endpoint | Result |
| --- | --- | --- |
| GET | /admin/leads | Filtered paginated listing (excludes notes/activity) |
| GET | /admin/leads/:id | Full lead, notes/activity and populated staff basic profiles |
| PATCH | /admin/leads/:id | Controlled update with activity entries |
| POST | /admin/leads/:id/notes | Append authored note and activity |
| DELETE | /admin/leads/:id | Admin-only permanent lead deletion |
| GET | /admin/dashboard | Dashboard statistics |

### Filters and pagination

`GET /admin/leads?status=new&interestedStream=PCMB&targetExam=NEET&requestType=general_enquiry&leadSource=website&page=1&limit=20`

Additional filters: assignedCounsellor (ObjectId), from/to (createdAt dates), search (literal case-insensitive substring in studentName, parentName, phone, email, school; max 100 chars). Date-only from/to use UTC day boundaries, with to inclusive through end of day. For Bengaluru calendar dates pass explicit timestamps with +05:30. Search phone uses the stored normalized string.

Default page=1, limit=20; limit must be 1–100; invalid values return 400. Sorted newest first with ID tie-breaker.
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "items": [],
    "pagination": {"page":1,"limit":20,"total":0,"pages":0}
  }
}
```

### Controlled updates

```json
{
  "status":"contacted",
  "assignedCounsellor":"507f1f77bcf86cd799439013",
  "followUpDate":"2027-01-16T10:00:00+05:30",
  "preferredContactTime":"Evening",
  "message":"Parent requested a return call",
  "campusVisit":{"requested":true,"preferredDate":"2027-01-17T10:00:00+05:30","timeSlot":"morning","status":"scheduled"},
  "counselling":{"requested":true,"scheduledAt":"2027-01-16T15:00:00+05:30","status":"scheduled"}
}
```

Only these top-level fields are accepted. Nested appointment fields merge individually; other fields remain intact. Assignment requires an active counsellor User (not an admin). Set assignedCounsellor/followUpDate to null to clear; appointment date fields and timeSlot also accept null. Appointment status enum: not_requested, requested, scheduled, completed, cancelled. timeSlot: morning, afternoon, evening, null.

Pipeline and appointment statuses are separate; update both explicitly when appropriate. Important changes append authored activity; unchanged values do not. Optimistic concurrency prevents silent overwrite of concurrent staff edits.

### Notes

`POST /admin/leads/:id/notes`
```json
{"text":"Parent asked for a fee discussion next Monday."}
```
Trimmed text must contain 1–2000 characters. Returns 201 with the saved note: _id, text, createdBy, createdAt. Author and timestamp are server-controlled.

## Dashboard

`GET /admin/dashboard` returns:
```json
{
  "success":true,
  "message":"Success",
  "data":{
    "totalLeads":1,"newLeads":1,"contacted":0,"counsellingScheduled":0,
    "campusVisits":0,"applicationsStarted":0,"admitted":0,"lost":0,
    "today":1,"thisWeek":1,"thisMonth":1,
    "byStream":{"PCMB":1,"PCMC":0,"PCME":0,"Undecided":0},
    "byTargetExam":{"NEET":1,"JEE":0,"KCET":0,"Boards":0,"Multiple":0,"Undecided":0},
    "bySource":{"website":1,"whatsapp":0,"instagram":0,"google":0,"referral":0,"walk_in":0,"other":0},
    "recentLeads":[]
  }
}
```

Pipeline counters count current status (campusVisits means campus_visit_scheduled). today/thisWeek/thisMonth count leads created since the respective Bengaluru boundary, through now; weeks start Monday. All enum groups include zero counts. recentLeads contains up to five recent leads with limited fields. Aggregation computes counts in one facet; indexed newest-first lookup retrieves recent leads.

## Migration

Back up the database, configure MONGODB_URI, then run `npm run migrate-enquiries`.

The script streams existing Enquiry documents, normalizes phone, maps name/class/course/message and preserves timestamps. Status maps new→new, contacted→contacted, enrolled→admitted, rejected→lost. Defaults are website/general_enquiry/Undecided; actual PCMB/PCMC/PCME legacy course values are also preserved.

A unique sparse legacyEnquiryId index makes reruns and concurrent attempts safe. No old documents are modified or deleted. Invalid historical records are reported by ID without printing personal fields and remain available for manual correction. Summary includes scanned/migrated/skipped/failed; nonzero failures produce a nonzero exit code. Even an empty database can run the script.

The Enquiry model is retained only for migration. New submissions exclusively create Leads.

## Tests and operations

Run `npm test` in backend. Node's built-in test runner, Supertest, and mongodb-memory-server run the real Express/Mongoose stack against a disposable MongoDB database, never the configured admissions database. First execution/install needs network access to obtain the MongoDB binary. Tests cover capture, existing form courses, strict validation, authentication, role restrictions, filters, notes/activity, dashboard counts, security limits, migration reruns, and real server startup/HTTP requests. Test accounts and JWT secrets are generated for the disposable database.

`GET /health` returns 200 when connected to MongoDB, 503 otherwise. `GET /status` returns service status. These use the standard success envelope. Startup awaits MongoDB before opening the port. Production startup validates required environment variables; signals close HTTP and MongoDB connections.

Indexes cover phone, createdAt, followUpDate and each principal filter with createdAt, plus the migration uniqueness constraint. There are no indexes on free-text fields, notes or activity. Timeline arrays are suitable for Phase 1 volume; move them to a separate collection if individual leads develop very large histories.

The package overrides qs to ^6.16.0 to address audited parser vulnerabilities while keeping Express 4. Reassess this override when Express updates its own dependency range.
