import Bookmark from '../models/Bookmark.js'
import {
  sendSuccess, sendCreated, sendNotFound,
  sendConflict, sendBadRequest,
} from '../utils/response.js'

// ── GET /api/bookmarks ────────────────────────────────────────────────────────
export async function getBookmarks(req, res, next) {
  try {
    const { page = 1, limit = 50, category } = req.query
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10)

    const filter = { user: req.user._id }
    if (category) filter['article.category'] = category

    const [bookmarks, total] = await Promise.all([
      Bookmark.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10))
        .lean(),
      Bookmark.countDocuments(filter),
    ])

    return sendSuccess(
      res,
      { bookmarks },
      'Bookmarks fetched',
      200,
      { total, page: parseInt(page, 10), limit: parseInt(limit, 10) }
    )
  } catch (err) {
    next(err)
  }
}

// ── POST /api/bookmarks ───────────────────────────────────────────────────────
export async function addBookmark(req, res, next) {
  try {
    const { article, tags = [], note = '' } = req.body

    if (!article?.url || !article?.title) {
      return sendBadRequest(res, 'article.url and article.title are required')
    }

    const exists = await Bookmark.findOne({ user: req.user._id, url: article.url })
    if (exists) return sendConflict(res, 'Article is already bookmarked')

    const bookmark = await Bookmark.create({
      user: req.user._id,
      article,
      url: article.url,
      tags,
      note,
    })

    return sendCreated(res, { bookmark }, 'Article bookmarked')
  } catch (err) {
    if (err.code === 11000) return sendConflict(res, 'Article is already bookmarked')
    next(err)
  }
}

// ── GET /api/bookmarks/:id ────────────────────────────────────────────────────
export async function getBookmark(req, res, next) {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id })
    if (!bookmark) return sendNotFound(res, 'Bookmark not found')
    return sendSuccess(res, { bookmark }, 'Bookmark fetched')
  } catch (err) {
    next(err)
  }
}

// ── PUT /api/bookmarks/:id ────────────────────────────────────────────────────
export async function updateBookmark(req, res, next) {
  try {
    const { tags, note } = req.body
    const updates = {}
    if (Array.isArray(tags)) updates.tags = tags
    if (typeof note === 'string') updates.note = note.slice(0, 500)

    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: updates },
      { new: true }
    )
    if (!bookmark) return sendNotFound(res, 'Bookmark not found')
    return sendSuccess(res, { bookmark }, 'Bookmark updated')
  } catch (err) {
    next(err)
  }
}

// ── DELETE /api/bookmarks/:id ─────────────────────────────────────────────────
export async function deleteBookmark(req, res, next) {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!bookmark) return sendNotFound(res, 'Bookmark not found')
    return sendSuccess(res, {}, 'Bookmark removed')
  } catch (err) {
    next(err)
  }
}

// ── DELETE /api/bookmarks  (bulk) ─────────────────────────────────────────────
export async function clearBookmarks(req, res, next) {
  try {
    const result = await Bookmark.deleteMany({ user: req.user._id })
    return sendSuccess(res, { deleted: result.deletedCount }, 'All bookmarks cleared')
  } catch (err) {
    next(err)
  }
}

// ── GET /api/bookmarks/check?url=… ───────────────────────────────────────────
export async function checkBookmark(req, res, next) {
  try {
    const { url } = req.query
    if (!url) return sendBadRequest(res, 'url query parameter is required')
    const exists = await Bookmark.findOne({ user: req.user._id, url }).select('_id').lean()
    return sendSuccess(res, { bookmarked: !!exists, id: exists?._id || null }, 'Check complete')
  } catch (err) {
    next(err)
  }
}
