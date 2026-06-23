import { Link, useParams } from 'react-router-dom'
import { CATEGORIES } from '../utils/helpers'

export default function CategoryFilter({ activeCategory, onSelect }) {
  const { category: paramCategory } = useParams()
  const active = activeCategory || paramCategory || 'general'

  if (onSelect) {
    // Controlled mode (inline filter)
    return (
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`category-pill ${
              active === id ? 'category-pill-active' : 'category-pill-inactive'
            }`}
          >
            <span className="mr-1">{emoji}</span>
            {label}
          </button>
        ))}
      </div>
    )
  }

  // Link mode (nav)
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ id, label, emoji }) => (
        <Link
          key={id}
          to={`/category/${id}`}
          className={`category-pill ${
            active === id ? 'category-pill-active' : 'category-pill-inactive'
          }`}
        >
          <span className="mr-1">{emoji}</span>
          {label}
        </Link>
      ))}
    </div>
  )
}
