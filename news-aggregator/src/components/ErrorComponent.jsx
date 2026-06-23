export default function ErrorComponent({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100 mb-2">
        Something went wrong
      </h3>
      <p className="text-ink-500 dark:text-ink-400 text-sm max-w-sm mb-6 leading-relaxed">
        {message || 'Failed to load news. This may be due to an invalid API key or network issue.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 mb-6 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-3xl">
        {icon || '📰'}
      </div>
      <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-100 mb-2">
        {title || 'No articles found'}
      </h3>
      <p className="text-ink-500 dark:text-ink-400 text-sm max-w-sm leading-relaxed">
        {description || 'Try adjusting your search or check back later.'}
      </p>
    </div>
  )
}
