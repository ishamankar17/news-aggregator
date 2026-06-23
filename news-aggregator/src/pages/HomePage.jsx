import { useState, useCallback } from 'react'
import HeroSection from '../components/HeroSection'
import NewsCard from '../components/NewsCard'
import CategoryFilter from '../components/CategoryFilter'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorComponent, { EmptyState } from '../components/ErrorComponent'
import { useNews } from '../hooks/useNews'
import { fetchTopHeadlines } from '../services/newsApi'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('general')

  const fetcher = useCallback(
    () => fetchTopHeadlines({ category: activeCategory, pageSize: 21 }),
    [activeCategory]
  )

  const { articles, loading, error, reload } = useNews(fetcher, [activeCategory])

  const featured = articles[0]
  const secondary = articles.slice(1, 4)
  const rest = articles.slice(4)

  return (
    <div>
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-ink-100">
              Top Headlines
            </h2>
          </div>
          <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>

        {loading && <LoadingSkeleton variant="featured" count={6} />}
        {error && <ErrorComponent message={error} onRetry={reload} />}

        {!loading && !error && articles.length === 0 && (
          <EmptyState
            title="No articles found"
            description="No news available for this category right now. Try another category or check back soon."
            icon="🗞️"
          />
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="space-y-10 animate-fade-in">
            {/* Featured article */}
            {featured && (
              <NewsCard article={{ ...featured, category: activeCategory }} variant="featured" />
            )}

            {/* Secondary row */}
            {secondary.length > 0 && (
              <div>
                <h3 className="font-display font-semibold text-lg text-ink-800 dark:text-ink-200 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-accent-600 rounded-full" />
                  Latest Stories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secondary.map((article) => (
                    <NewsCard
                      key={article.url}
                      article={{ ...article, category: activeCategory }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Rest of articles */}
            {rest.length > 0 && (
              <div>
                <h3 className="font-display font-semibold text-lg text-ink-800 dark:text-ink-200 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-accent-600 rounded-full" />
                  More News
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {rest.map((article) => (
                    <NewsCard
                      key={article.url}
                      article={{ ...article, category: activeCategory }}
                      variant="horizontal"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
