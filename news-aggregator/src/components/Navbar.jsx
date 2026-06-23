import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const BookmarkIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function Navbar() {
  const { darkMode, toggleDarkMode, bookmarks } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-accent-600 dark:text-accent-400'
        : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-ink-950/90 backdrop-blur-md shadow-sm'
          : 'bg-white dark:bg-ink-950'
      } border-b border-ink-100 dark:border-ink-900`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">N</span>
            </div>
            <span className="font-display font-bold text-xl text-ink-900 dark:text-ink-100">
              News<span className="text-accent-600">Wire</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/category/technology" className={navLinkClass}>Technology</NavLink>
            <NavLink to="/category/business" className={navLinkClass}>Business</NavLink>
            <NavLink to="/category/science" className={navLinkClass}>Science</NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news…"
                className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-700 rounded-lg text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                <SearchIcon />
              </span>
            </form>

            <NavLink to="/bookmarks" className={({ isActive }) =>
              `relative p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-accent-600 bg-accent-50 dark:bg-accent-950/40'
                  : 'text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
              }`
            }>
              <BookmarkIcon filled={bookmarks.length > 0} />
              {bookmarks.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarks.length > 9 ? '9+' : bookmarks.length}
                </span>
              )}
            </NavLink>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <NavLink to="/bookmarks" className="relative p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors">
              <BookmarkIcon filled={bookmarks.length > 0} />
              {bookmarks.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarks.length > 9 ? '9+' : bookmarks.length}
                </span>
              )}
            </NavLink>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-950 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news…"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-700 rounded-lg text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                <SearchIcon />
              </span>
            </form>
            <nav className="flex flex-col gap-1">
              {[
                { to: '/', label: 'Home', end: true },
                { to: '/category/technology', label: 'Technology' },
                { to: '/category/business', label: 'Business' },
                { to: '/category/science', label: 'Science' },
                { to: '/category/health', label: 'Health' },
                { to: '/category/sports', label: 'Sports' },
                { to: '/category/entertainment', label: 'Entertainment' },
              ].map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400'
                        : 'text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
