import { Router } from 'express'
import * as bookmarkCtrl from '../controllers/bookmarkController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// All bookmark routes require authentication
router.use(protect)

router.get('/',         bookmarkCtrl.getBookmarks)
router.post('/',        bookmarkCtrl.addBookmark)
router.delete('/',      bookmarkCtrl.clearBookmarks)   // bulk clear

router.get('/check',    bookmarkCtrl.checkBookmark)    // ?url=… must come before /:id

router.get('/:id',      bookmarkCtrl.getBookmark)
router.put('/:id',      bookmarkCtrl.updateBookmark)
router.delete('/:id',   bookmarkCtrl.deleteBookmark)

export default router
