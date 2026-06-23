import { Link } from 'react-router-dom'
import { CATEGORIES } from '../utils/helpers'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-950 dark:bg-black text-ink-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-display">N</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                News<span className="text-accent-500">Wire</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-4">
              Stay informed with curated headlines from trusted sources across the globe. Real-time news, zero noise.
            </p>
            <p className="text-xs text-ink-600">
              Powered by{' '}
              <a
                href="https://newsapi.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-500 hover:text-accent-400 transition-colors"
              >
                NewsAPI.org
              </a>
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.map(({ id, label, emoji }) => (
                <li key={id}>
                  <Link
                    to={`/category/${id}`}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{emoji}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/bookmarks', label: 'Bookmarks' },
                { to: '/search?q=technology', label: 'Technology' },
                { to: '/search?q=climate', label: 'Climate' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-600">
          <p>© {year} NewsWire. Built with React & Tailwind CSS.</p>
          <p>For educational use. All content © respective publishers.</p>
        </div>
      </div>
    </footer>
  )
}
