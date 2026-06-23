import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import NewsCard from '../components/NewsCard'
import { EmptyState } from '../components/ErrorComponent'

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useApp()
  const [confirmClear, setConfirmClear] = useState(false)

  const handleClearAll = () => {
    if (confirmClear) {
      bookmarks.forEach((b) => removeBookmark(b.url))
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-400 mb-6">
        <Link to="/" className="hover:text-ink-700 dark:hover:text-ink-200 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-ink-700 dark:text-ink-200 font-medium">Bookmarks</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 dark:text-ink-100 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Bookmarks
          </h1>
          <p className="text-ink-500 dark:text-ink-400 text-sm mt-1">
            {bookmarks.length === 0
              ? 'No saved articles'
              : `${bookmarks.length} saved article${bookmarks.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={handleClearAll}
            className={`text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              confirmClear
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'text-red-500 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30'
            }`}
          >
            {confirmClear ? '⚠️ Confirm Clear All' : 'Clear All'}
          </button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          description="Save articles to read later by clicking the bookmark icon on any news card."
          icon="🔖"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {bookmarks.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}

      {bookmarks.length > 0 && (
        <div className="mt-10 text-center">
          <p className="text-ink-400 dark:text-ink-500 text-sm">
            Bookmarks are saved locally in your browser.
          </p>
        </div>
      )}
    </main>
  )
}
