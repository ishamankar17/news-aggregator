import { Router } from 'express'
import * as historyCtrl from '../controllers/searchHistoryController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.get('/',         historyCtrl.getHistory)
router.delete('/',      historyCtrl.clearHistory)
router.delete('/:id',   historyCtrl.deleteHistoryEntry)

export default router
