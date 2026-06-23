import axios from 'axios'

/**
 * Primary API client — talks to the NewsWire Node.js backend.
 * Set VITE_API_BASE_URL=http://localhost:5000/api in your .env
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 12_000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token from localStorage on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nw_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Normalise error messages
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ||
      (err.code === 'ECONNABORTED' ? 'Request timed out.' : 'Network error. Is the backend running?')
    return Promise.reject(new Error(msg))
  }
)

// ── News endpoints ────────────────────────────────────────────────────────────
export const fetchTopHeadlines = ({ category = 'general', pageSize = 20, page = 1 } = {}) =>
  api.get('/news/headlines', { params: { category, pageSize, page } })
    .then((r) => ({ data: r.data.data }))

export const searchNews = ({ query, pageSize = 20, page = 1, sortBy = 'publishedAt' } = {}) =>
  api.get('/news/search', { params: { q: query, pageSize, page, sortBy } })
    .then((r) => ({ data: r.data.data }))

export const fetchByCategory = ({ category, pageSize = 20, page = 1 } = {}) =>
  api.get(`/news/category/${category}`, { params: { pageSize, page } })
    .then((r) => ({ data: r.data.data }))

// ── Auth endpoints ────────────────────────────────────────────────────────────
export const authRegister = (data) => api.post('/auth/register', data)
export const authLogin    = (data) => api.post('/auth/login',    data)
export const authGetMe    = ()     => api.get('/auth/me')
export const authUpdateMe = (data) => api.put('/auth/me',        data)

// ── Bookmark endpoints ────────────────────────────────────────────────────────
export const getBookmarks    = (params) => api.get('/bookmarks', { params })
export const addBookmark     = (article) => api.post('/bookmarks', { article })
export const removeBookmark  = (id)     => api.delete(`/bookmarks/${id}`)
export const clearBookmarks  = ()       => api.delete('/bookmarks')
export const checkBookmark   = (url)    => api.get('/bookmarks/check', { params: { url } })

// ── Search history endpoints ──────────────────────────────────────────────────
export const getSearchHistory   = () => api.get('/search-history')
export const clearSearchHistory = () => api.delete('/search-history')

export default api
