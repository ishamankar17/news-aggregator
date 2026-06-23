import { useState, useEffect, useCallback, useRef } from 'react'

export function useNews(fetcher, deps = []) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const abortRef = useRef(null)

  const load = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetcher()
      if (controller.signal.aborted) return
      const items = (res.data.articles || []).filter(
        (a) => a.title && a.title !== '[Removed]' && a.url
      )
      setArticles(items)
      setTotalResults(res.data.totalResults || 0)
    } catch (err) {
      if (controller.signal.aborted) return
      setError(err.message || 'Failed to load news.')
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load()
    return () => abortRef.current?.abort()
  }, [load])

  return { articles, loading, error, totalResults, reload: load }
}
