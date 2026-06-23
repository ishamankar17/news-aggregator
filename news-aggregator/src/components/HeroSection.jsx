import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-accent-950 dark:from-black dark:via-ink-950 dark:to-accent-950 py-16 sm:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-600/20 border border-accent-600/30 text-accent-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse-soft" />
          Live News Feed
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4 animate-slide-up">
          Stay Informed,{' '}
          <span className="text-accent-400">Stay Ahead</span>
        </h1>

        <p className="text-ink-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
          Your intelligent news aggregator — curated headlines from across the world, organized by topic and delivered in real time.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto animate-slide-up"
        >
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for news, topics, people…"
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <button type="submit" className="btn-primary py-3.5 px-6 text-base whitespace-nowrap">
            Search News
          </button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-ink-400 animate-fade-in">
          <span>Trending:</span>
          {['AI & Technology', 'Climate', 'Markets', 'Space', 'Politics'].map((t) => (
            <button
              key={t}
              onClick={() => navigate(`/search?q=${encodeURIComponent(t)}`)}
              className="text-ink-300 hover:text-accent-400 transition-colors underline underline-offset-2"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
