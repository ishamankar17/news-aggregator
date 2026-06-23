import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    url:         { type: String, required: true },
    urlToImage:  { type: String, default: '' },
    publishedAt: { type: Date },
    source: {
      id:   { type: String, default: '' },
      name: { type: String, default: '' },
    },
    author:   { type: String, default: '' },
    content:  { type: String, default: '' },
    category: { type: String, default: 'general' },
  },
  { _id: false }
)

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    article: { type: articleSchema, required: true },
    // Store url at top level for fast duplicate checks
    url: { type: String, required: true },
    tags: { type: [String], default: [] },
    note: { type: String, default: '', maxlength: 500 },
  },
  { timestamps: true }
)

// A user can only bookmark the same URL once
bookmarkSchema.index({ user: 1, url: 1 }, { unique: true })

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)
export default Bookmark
