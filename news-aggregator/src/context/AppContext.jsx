import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Theme
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), [])

  // Bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bookmarks') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = useCallback((article) => {
    setBookmarks((prev) => {
      if (prev.find((b) => b.url === article.url)) return prev
      return [article, ...prev]
    })
  }, [])

  const removeBookmark = useCallback((url) => {
    setBookmarks((prev) => prev.filter((b) => b.url !== url))
  }, [])

  const isBookmarked = useCallback(
    (url) => bookmarks.some((b) => b.url === url),
    [bookmarks]
  )

  const toggleBookmark = useCallback(
    (article) => {
      if (isBookmarked(article.url)) removeBookmark(article.url)
      else addBookmark(article)
    },
    [isBookmarked, addBookmark, removeBookmark]
  )

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
