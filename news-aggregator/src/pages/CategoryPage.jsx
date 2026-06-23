import { useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import CategoryFilter from '../components/CategoryFilter'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorComponent, { EmptyState } from '../components/ErrorComponent'
import { useNews } from '../hooks/useNews'
import { fetchByCategory } from '../services/newsApi'
import { CATEGORIES } from '../utils/helpers'

export default function CategoryPage() {
  const { category = 'general' } = useParams()
  const navigate = useNavigate()

  const categoryInfo = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0]

  const fetcher = useCallback(
    () => fetchByCategory({ category, pageSize: 20 }),
    [category]
  )

  const { articles, loading, error, totalResults, reload } = useNews(fetcher, [category])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-400 mb-6">
        <Link to="/" className="hover:text-ink-700 dark:hover:text-ink-200 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-ink-700 dark:text-ink-200 font-medium capitalize">{categoryInfo.label}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{categoryInfo.emoji}</span>
          <h1 className="font-display font-bold text-3xl text-ink-900 dark:text-ink-100">
            {categoryInfo.label}
          </h1>
        </div>
        {!loading && totalResults > 0 && (
          <p className="text-ink-500 dark:text-ink-400 text-sm">
            Showing {articles.length} of {totalResults.toLocaleString()} articles
          </p>
        )}
      </div>

      {/* Category filter */}
      <div className="mb-8">
        <CategoryFilter
          activeCategory={category}
          onSelect={(id) => navigate(`/category/${id}`)}
        />
      </div>

      {loading && <LoadingSkeleton count={9} />}
      {error && <ErrorComponent message={error} onRetry={reload} />}

      {!loading && !error && articles.length === 0 && (
        <EmptyState
          title={`No ${categoryInfo.label} news`}
          description="Nothing here right now. Try another category or check back soon."
          icon={categoryInfo.emoji}
        />
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="animate-fade-in">
          {/* Featured */}
          <div className="mb-8">
            <NewsCard article={{ ...articles[0], category }} variant="featured" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <NewsCard key={article.url} article={{ ...article, category }} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
