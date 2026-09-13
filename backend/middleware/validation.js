import { body, query, param, validationResult } from 'express-validator'
import { enums, appointmentStatuses, publicFields, updateFields } from '../config/leadFields.js'
import { normalizePhone } from '../utils/phone.js'

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({
    success: false, message: 'Validation failed',
    errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
  })
  next()
}
const string = (key, max, min = 0) => body(key).isString().bail().trim().isLength({ min, max })
const date = key => body(key).optional({ values: 'null' }).isString().bail().isISO8601({ strict: true }).bail().toDate()
const allowed = fields => body().custom(value => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Body must be an object')
  if (Object.keys(value).some(k => !fields.includes(k))) throw new Error('Unsupported field')
  return true
})
const nested = (key, fields) => body(key).optional().isObject({ strict: true }).bail().custom(v => Object.keys(v).every(k => fields.includes(k))).withMessage('Unsupported appointment field')

export const leadValidators = [
  allowed([...publicFields, 'name', 'class', 'course']),
  string('studentName', 100, 2),
  ...['phone', 'whatsapp'].map(key => {
    const chain = body(key)
    if (key === 'whatsapp') chain.optional()
    return chain.isString().bail().customSanitizer(normalizePhone).matches(/^\+91[6-9]\d{9}$/).withMessage('Enter a valid Indian mobile number')
  }),
  ...Object.entries({ parentName: 100, school: 150, preferredContactTime: 150, message: 1000 }).map(([key, max]) => string(key, max).optional()),
  body('email').optional().isString().bail().trim().isLength({ max: 254 }).isEmail().bail().toLowerCase(),
  ...Object.entries(enums).filter(([key]) => key !== 'status').map(([key, values]) => body(key).optional().isString().bail().isIn(values)),
  body('course').optional().isString().bail().isIn(['JEE', 'NEET', 'Foundation', 'PCMB', 'PCMC', 'PCME', 'PU Integrated Program']),
  nested('campusVisit', ['preferredDate', 'timeSlot']),
  body('campusVisit.preferredDate').optional().isString().bail().isISO8601({ strict: true }).bail().toDate(),
  body('campusVisit.timeSlot').optional({ values: 'null' }).isIn(['morning', 'afternoon', 'evening']),
  validate,
]
export const idValidators = [param('id').isMongoId(), validate]
export const loginValidators = [
  allowed(['email', 'password']),
  body('email').isString().bail().trim().isLength({ max: 254 }).isEmail().bail().toLowerCase(),
  body('password').isString().bail().isLength({ min: 1, max: 72 }).custom(v => Buffer.byteLength(v) <= 72),
  validate,
]
export const listValidators = [
  ...['status', 'interestedStream', 'targetExam', 'requestType', 'leadSource'].map(key => query(key).optional().isString().bail().isIn(enums[key])),
  query('assignedCounsellor').optional().isMongoId(),
  query('page').optional().isInt({ min: 1, max: 1000000 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('search').optional().isString().bail().trim().isLength({ max: 100 }),
  ...['from', 'to'].map(key => query(key).optional().isString().bail().isISO8601({ strict: true })),
  query('to').custom((v, { req }) => !v || !req.query.from || new Date(v) >= new Date(req.query.from)).withMessage('to must be on or after from'),
  validate,
]
export const patchValidators = [
  allowed(updateFields),
  body().custom(v => Object.keys(v).length > 0).withMessage('At least one field is required'),
  body('status').optional().isIn(enums.status),
  body('assignedCounsellor').optional({ values: 'null' }).isMongoId(),
  date('followUpDate'),
  string('preferredContactTime', 150).optional(), string('message', 1000).optional(),
  nested('campusVisit', ['requested', 'preferredDate', 'timeSlot', 'status']),
  nested('counselling', ['requested', 'scheduledAt', 'status']),
  ...['campusVisit', 'counselling'].flatMap(key => [
    body(`${key}.requested`).optional().isBoolean({ strict: true }),
    body(`${key}.status`).optional().isIn(appointmentStatuses),
  ]),
  date('campusVisit.preferredDate'), date('counselling.scheduledAt'),
  body('campusVisit.timeSlot').optional({ values: 'null' }).isIn(['morning', 'afternoon', 'evening']),
  validate,
]
export const noteValidators = [allowed(['text']), string('text', 2000, 1), validate]
