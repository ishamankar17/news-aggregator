import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatDate, getDomain, CATEGORY_COLORS, PLACEHOLDER_IMAGE } from '../utils/helpers'

const BookmarkIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

export default function NewsCard({ article, variant = 'default' }) {
  const { toggleBookmark, isBookmarked } = useApp()
  const [imgError, setImgError] = useState(false)
  const bookmarked = isBookmarked(article.url)

  const imageSrc = (!imgError && article.urlToImage) ? article.urlToImage : PLACEHOLDER_IMAGE

  const category = article.category || ''
  const categoryColor = CATEGORY_COLORS[category] || 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400'

  if (variant === 'featured') {
    return (
      <article className="card group relative overflow-hidden h-full animate-fade-in">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <img
              src={imageSrc}
              alt={article.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {category && (
                <span className={`category-pill mb-3 inline-block ${categoryColor}`}>
                  {category}
                </span>
              )}
              <h2 className="text-white font-display font-bold text-xl sm:text-2xl leading-tight mb-2 line-clamp-2">
                {article.title}
              </h2>
              <div className="flex items-center gap-3 text-white/70 text-xs">
                <span>{getDomain(article.url)}</span>
                <span>·</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </div>
        </a>
        <button
          onClick={(e) => { e.preventDefault(); toggleBookmark(article) }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 active:scale-90 ${
            bookmarked
              ? 'bg-accent-600 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article className="card group flex gap-4 p-4 hover:shadow-md transition-shadow duration-200 animate-fade-in">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden"
        >
          <img
            src={imageSrc}
            alt={article.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            {category && (
              <span className={`category-pill text-[10px] mb-1 ${categoryColor}`}>{category}</span>
            )}
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-ink-900 dark:text-ink-100 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                {article.title}
              </h3>
            </a>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-ink-400 dark:text-ink-500 text-xs">
              <span className="truncate max-w-[100px]">{getDomain(article.url)}</span>
              <span>·</span>
              <span className="whitespace-nowrap">{formatDate(article.publishedAt)}</span>
            </div>
            <button
              onClick={() => toggleBookmark(article)}
              className={`p-1.5 rounded-md transition-all duration-200 active:scale-90 ${
                bookmarked
                  ? 'text-accent-600 bg-accent-50 dark:bg-accent-950/40'
                  : 'text-ink-400 hover:text-accent-600 hover:bg-ink-50 dark:hover:bg-ink-800'
              }`}
              aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <BookmarkIcon filled={bookmarked} />
            </button>
          </div>
        </div>
      </article>
    )
  }

  // Default card
  return (
    <article className="card group flex flex-col hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 animate-slide-up">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-48 overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={article.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {category && (
          <span className={`absolute top-3 left-3 category-pill ${categoryColor}`}>
            {category}
          </span>
        )}
      </a>
      <div className="flex flex-col flex-1 p-4">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h3 className="font-semibold text-base leading-snug line-clamp-2 text-ink-900 dark:text-ink-100 hover:text-accent-600 dark:hover:text-accent-400 transition-colors mb-2">
            {article.title}
          </h3>
        </a>
        {article.description && (
          <p className="text-ink-500 dark:text-ink-400 text-sm leading-relaxed line-clamp-2 mb-3">
            {article.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink-100 dark:border-ink-800">
          <div className="flex items-center gap-1.5 text-ink-400 dark:text-ink-500 text-xs min-w-0">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-accent-600 transition-colors truncate"
            >
              <span className="truncate">{article.source?.name || getDomain(article.url)}</span>
              <ExternalLinkIcon />
            </a>
            <span>·</span>
            <span className="whitespace-nowrap">{formatDate(article.publishedAt)}</span>
          </div>
          <button
            onClick={() => toggleBookmark(article)}
            className={`p-1.5 rounded-md ml-2 shrink-0 transition-all duration-200 active:scale-90 ${
              bookmarked
                ? 'text-accent-600 bg-accent-50 dark:bg-accent-950/40'
                : 'text-ink-400 hover:text-accent-600 hover:bg-ink-50 dark:hover:bg-ink-800'
            }`}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <BookmarkIcon filled={bookmarked} />
          </button>
        </div>
      </div>
    </article>
  )
}
