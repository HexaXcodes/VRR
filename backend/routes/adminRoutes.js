import { Router } from 'express'
import { authenticate, adminOnly } from '../middleware/auth.js'
import { listValidators, idValidators, patchValidators, noteValidators } from '../middleware/validation.js'
import { listLeads, getLead, patchLead, addNote, deleteLead } from '../controllers/leadController.js'
import { dashboard } from '../controllers/dashboardController.js'
import { asyncHandler } from '../utils/errors.js'

const router = Router()
router.use(authenticate)
router.get('/dashboard', asyncHandler(dashboard))
router.get('/leads', ...listValidators, asyncHandler(listLeads))
router.get('/leads/:id', ...idValidators, asyncHandler(getLead))
router.patch('/leads/:id', ...idValidators, ...patchValidators, asyncHandler(patchLead))
router.post('/leads/:id/notes', ...idValidators, ...noteValidators, asyncHandler(addNote))
router.delete('/leads/:id', adminOnly, ...idValidators, asyncHandler(deleteLead))
export default router
