import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-fade-in">
      <p className="text-7xl font-display font-bold text-ink-200 dark:text-ink-800 mb-4">404</p>
      <h1 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">Page not found</h1>
      <p className="text-ink-500 dark:text-ink-400 text-sm max-w-xs mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary">
        ← Back to Home
      </Link>
    </main>
  )
}
