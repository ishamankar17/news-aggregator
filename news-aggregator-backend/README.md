# 🔧 NewsWire Backend — Node.js + MongoDB Atlas

Express REST API that powers the NewsWire frontend. Proxies NewsAPI.org, persists user bookmarks and search history in MongoDB Atlas, and protects routes with JWT auth.

---

## 📋 Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| MongoDB Atlas account | free tier works |
| NewsAPI key | [newsapi.org](https://newsapi.org) — free |

---

## 🚀 Quick Start

```bash
# 1. Enter the backend folder
cd news-aggregator-backend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env — fill in MONGODB_URI, NEWS_API_KEY, JWT_SECRET

# 4. Start development server (hot-reload)
npm run dev

# 5. Test the health endpoint
curl http://localhost:5000/api/health
```

Then in the frontend folder:

```bash
# .env
VITE_API_BASE_URL=http://localhost:5000/api

npm run dev   # http://localhost:5173
```

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | no | HTTP port (default `5000`) |
| `NODE_ENV` | no | `development` / `production` |
| `MONGODB_URI` | **yes** | MongoDB Atlas connection string |
| `NEWS_API_KEY` | **yes** | NewsAPI.org API key |
| `NEWS_API_BASE_URL` | no | NewsAPI base URL (default: `https://newsapi.org/v2`) |
| `JWT_SECRET` | **yes** | Long random string for signing tokens |
| `JWT_EXPIRES_IN` | no | Token lifetime (default `7d`) |
| `CACHE_TTL_HEADLINES` | no | Cache seconds for headlines (default `300`) |
| `CACHE_TTL_SEARCH` | no | Cache seconds for search (default `180`) |
| `CACHE_TTL_SOURCES` | no | Cache seconds for sources (default `3600`) |
| `CORS_ORIGINS` | no | Comma-separated allowed origins |

### Getting your MongoDB Atlas URI

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free cluster
2. **Database Access** → Add user with password
3. **Network Access** → Allow IP (`0.0.0.0/0` for dev)
4. **Connect** → Drivers → Copy URI → replace `<password>`

---

## 📁 Project Structure

```
src/
├── server.js              # Entry: connect DB → listen
├── app.js                 # Express setup, middleware stack
├── config/
│   ├── database.js        # Mongoose + Atlas connection
│   └── newsApi.js         # Axios client for NewsAPI.org
├── controllers/
│   ├── authController.js        # register, login, me, update, delete
│   ├── bookmarkController.js    # CRUD + check + bulk-clear
│   ├── newsController.js        # headlines, search, category, sources
│   └── searchHistoryController.js
├── middleware/
│   ├── auth.js            # protect (JWT required) + optionalAuth
│   ├── errorHandler.js    # global error + 404 handlers
│   ├── rateLimiter.js     # api / auth / news rate limiters
│   └── validate.js        # express-validator result checker
├── models/
│   ├── User.js            # bcrypt hashing, comparePassword
│   ├── Bookmark.js        # unique (user, url) index
│   └── SearchHistory.js
├── routes/
│   ├── index.js           # mounts all routers + /health
│   ├── auth.js
│   ├── bookmarks.js
│   ├── news.js
│   └── searchHistory.js
├── services/
│   ├── authService.js     # signToken, verifyToken
│   └── newsService.js     # getTopHeadlines, searchArticles, getSources
└── utils/
    ├── cache.js           # node-cache wrapper + withCache()
    ├── logger.js          # Winston (console + file)
    └── response.js        # sendSuccess / sendError helpers
```

---

## 🌐 API Reference

### Health
```
GET /api/health
```

### Auth
```
POST   /api/auth/register          { name, email, password }
POST   /api/auth/login             { email, password }
GET    /api/auth/me                🔒
PUT    /api/auth/me                🔒 { name?, preferences? }
PUT    /api/auth/change-password   🔒 { currentPassword, newPassword }
DELETE /api/auth/me                🔒
```

### News (proxied from NewsAPI)
```
GET /api/news/headlines            ?category=technology&page=1&pageSize=20
GET /api/news/search               ?q=bitcoin&sortBy=publishedAt
GET /api/news/category/:category   ?page=1&pageSize=20
GET /api/news/sources              ?category=technology
GET /api/news/cache-stats
```

### Bookmarks (🔒 all routes require JWT)
```
GET    /api/bookmarks              ?page=1&limit=50&category=technology
POST   /api/bookmarks              { article: { title, url, ... } }
DELETE /api/bookmarks              (clear all)
GET    /api/bookmarks/check        ?url=https://...
GET    /api/bookmarks/:id
PUT    /api/bookmarks/:id          { tags?, note? }
DELETE /api/bookmarks/:id
```

### Search History (🔒)
```
GET    /api/search-history         ?limit=20
DELETE /api/search-history
DELETE /api/search-history/:id
```

---

## 🏗️ Response Shape

Every response follows this envelope:

```json
{
  "success": true,
  "message": "Headlines fetched",
  "data": { "articles": [...], "totalResults": 1234 },
  "meta": { "category": "technology", "page": 1, "pageSize": 20 }
}
```

Errors:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Valid email is required" }]
}
```

---

## 🔒 Security Features

- **Helmet** — sets secure HTTP headers
- **express-mongo-sanitize** — blocks MongoDB injection via `$` / `.`
- **Rate limiting** — 100 req/15 min general, 10 req/15 min auth
- **bcryptjs** — password hashing (12 salt rounds)
- **JWT** — stateless auth, 7-day tokens
- **CORS** — explicit origin allowlist
- **Body size limit** — 10 KB max payload

---

## 📦 Stack

| Package | Purpose |
|---------|---------|
| express | HTTP framework |
| mongoose | MongoDB ODM |
| axios | HTTP client (NewsAPI proxy) |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT signing & verification |
| node-cache | In-memory response cache |
| express-rate-limit | Rate limiting |
| express-validator | Request validation |
| express-mongo-sanitize | NoSQL injection prevention |
| helmet | HTTP security headers |
| compression | Gzip responses |
| morgan | HTTP request logger |
| winston | Structured logging |
| dotenv | Environment variables |
