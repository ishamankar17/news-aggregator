import mongoose from 'mongoose'

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    query:       { type: String, required: true, trim: true },
    resultCount: { type: Number, default: 0 },
    category:    { type: String, default: '' },
  },
  { timestamps: true }
)

// Keep only the latest 50 searches per user (TTL alternative via capped logic)
searchHistorySchema.index({ user: 1, createdAt: -1 })

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema)
export default SearchHistory
