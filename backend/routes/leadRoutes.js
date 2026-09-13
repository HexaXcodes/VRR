import { Router } from 'express'
import { submitLead } from '../controllers/leadController.js'
import { legacyEnquiry } from '../middleware/legacyEnquiry.js'
import { leadValidators } from '../middleware/validation.js'
import { asyncHandler } from '../utils/errors.js'

const router = Router()
const submit = [legacyEnquiry, ...leadValidators, asyncHandler(submitLead)]
router.post('/', ...submit)
for (const [path, type] of Object.entries({ 'fee-structure': 'fee_structure', 'campus-visit': 'campus_visit', counselling: 'counselling' })) {
  router.post(`/${path}`, (req, res, next) => { req.body.requestType = type; next() }, ...submit)
}
export default router
