import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSkeleton from './components/LoadingSkeleton'

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <LoadingSkeleton count={6} />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </AppProvider>
  )
}
