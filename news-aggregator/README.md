# 📰 NewsWire — News Aggregator

A modern, fully responsive news aggregator built with React, Vite, and Tailwind CSS.

## ✨ Features

- 🌐 **React Router v6** — Home, Category, Search, Bookmarks pages
- 🎨 **Dark / Light mode** — persisted via localStorage, respects system preference
- 🔖 **Bookmarks** — save & manage articles locally
- 🔍 **Search** — keyword search with sort options (latest, relevance, popularity)
- 📂 **7 Categories** — General, Technology, Business, Health, Sports, Entertainment, Science
- ⚡ **Lazy loading** — code splitting per route via `React.lazy`
- 💀 **Loading skeletons** — shimmer placeholders while fetching
- ❌ **Error & empty states** — graceful fallbacks with retry
- 📱 **Fully responsive** — mobile, tablet, and desktop layouts
- 🎭 **Smooth animations** — fade-in, slide-up, shimmer effects

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Get a free API key

Sign up at [https://newsapi.org](https://newsapi.org) — it's free for development.

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
VITE_NEWS_API_KEY=your_actual_api_key_here
VITE_NEWS_API_BASE_URL=https://newsapi.org/v2
```

### 4. Run the dev server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky header with search, theme, mobile menu
│   ├── HeroSection.jsx     # Landing hero with search bar
│   ├── NewsCard.jsx        # 3 variants: default, featured, horizontal
│   ├── CategoryFilter.jsx  # Category pills (link or controlled mode)
│   ├── LoadingSkeleton.jsx # Shimmer skeletons (grid, horizontal, featured)
│   ├── ErrorComponent.jsx  # Error + EmptyState components
│   └── Footer.jsx          # Site footer with category links
├── context/
│   └── AppContext.jsx      # Theme + bookmarks via Context API
├── hooks/
│   └── useNews.js          # Data fetching hook with abort/cleanup
├── pages/
│   ├── HomePage.jsx        # Featured + grid + horizontal layout
│   ├── CategoryPage.jsx    # Category-specific news
│   ├── SearchPage.jsx      # Keyword search with sort
│   ├── BookmarksPage.jsx   # Saved articles management
│   └── NotFoundPage.jsx    # 404 fallback
├── services/
│   └── newsApi.js          # Axios instance + API methods
└── utils/
    └── helpers.js          # Constants, formatters, color maps
```

## ⚠️ NewsAPI Notes

- **Free tier** only works from `localhost` (not deployed URLs)
- For production, upgrade to a paid plan or use a proxy server
- The free tier returns up to 100 results per request
- Some sources may be paywalled or removed (`[Removed]` titles are filtered out)

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool + HMR |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Axios | HTTP client |
| Context API | Global state |
