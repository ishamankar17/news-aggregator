export const CATEGORIES = [
  { id: 'general', label: 'General', emoji: '🌐' },
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'business', label: 'Business', emoji: '📈' },
  { id: 'health', label: 'Health', emoji: '🏥' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'science', label: 'Science', emoji: '🔬' },
]

export const CATEGORY_COLORS = {
  general: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  technology: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  business: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  health: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  sports: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  entertainment: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  science: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now - d
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return ''
  }
}

export function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60'
