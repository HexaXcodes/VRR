import { Router } from 'express'
import { createEnquiry } from '../controllers/enquiryController.js'
import { legacyEnquiry } from '../middleware/legacyEnquiry.js'
import { leadValidators } from '../middleware/validation.js'
import { asyncHandler } from '../utils/errors.js'

const router = Router()
// Submission-only compatibility alias. Historical public CRUD is deliberately retired.
router.post('/', legacyEnquiry, ...leadValidators, asyncHandler(createEnquiry))
export default router
