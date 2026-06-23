import SearchHistory from '../models/SearchHistory.js'
import { sendSuccess } from '../utils/response.js'

// ── GET /api/search-history ───────────────────────────────────────────────────
export async function getHistory(req, res, next) {
  try {
    const { limit = 20 } = req.query
    const history = await SearchHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(Math.min(parseInt(limit, 10), 50))
      .lean()
    return sendSuccess(res, { history }, 'Search history fetched')
  } catch (err) {
    next(err)
  }
}

// ── DELETE /api/search-history ────────────────────────────────────────────────
export async function clearHistory(req, res, next) {
  try {
    const result = await SearchHistory.deleteMany({ user: req.user._id })
    return sendSuccess(res, { deleted: result.deletedCount }, 'Search history cleared')
  } catch (err) {
    next(err)
  }
}

// ── DELETE /api/search-history/:id ───────────────────────────────────────────
export async function deleteHistoryEntry(req, res, next) {
  try {
    await SearchHistory.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    return sendSuccess(res, {}, 'Entry removed')
  } catch (err) {
    next(err)
  }
}
