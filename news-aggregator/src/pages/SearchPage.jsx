import { useState, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorComponent, { EmptyState } from '../components/ErrorComponent'
import { useNews } from '../hooks/useNews'
import { searchNews } from '../services/newsApi'

const SORT_OPTIONS = [
  { value: 'publishedAt', label: 'Latest' },
  { value: 'relevancy', label: 'Relevance' },
  { value: 'popularity', label: 'Popularity' },
]

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [sortBy, setSortBy] = useState('publishedAt')

  const fetcher = useCallback(
    () => searchNews({ query, pageSize: 20, sortBy }),
    [query, sortBy]
  )

  const { articles, loading, error, totalResults, reload } = useNews(fetcher, [query, sortBy])

  if (!query) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <EmptyState
          title="No search query"
          description="Use the search bar above to find news articles."
          icon="🔍"
        />
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-400 mb-6">
        <Link to="/" className="hover:text-ink-700 dark:hover:text-ink-200 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-ink-700 dark:text-ink-200 font-medium">Search</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 dark:text-ink-100">
            Results for{' '}
            <span className="text-accent-600 dark:text-accent-400">"{query}"</span>
          </h1>
          {!loading && (
            <p className="text-ink-500 dark:text-ink-400 text-sm mt-1">
              {articles.length > 0
                ? `Found ${totalResults.toLocaleString()} articles · showing ${articles.length}`
                : 'No articles found'}
            </p>
          )}
        </div>

        {/* Sort control */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-sm text-ink-500 dark:text-ink-400 whitespace-nowrap">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm px-3 py-2 rounded-lg bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <LoadingSkeleton count={9} />}
      {error && <ErrorComponent message={error} onRetry={reload} />}

      {!loading && !error && articles.length === 0 && (
        <EmptyState
          title={`No results for "${query}"`}
          description="Try different keywords or check your spelling. NewsAPI free tier has limited search coverage."
          icon="🔍"
        />
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </main>
  )
}
