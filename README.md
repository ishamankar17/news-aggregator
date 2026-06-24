
# NewsWire 📰

A news app that brings live headlines from around the world into one place. You can search for topics, browse categories, save articles you like, and keep track of what you've been reading — all with your own personal account.

**🔗 Try it live:** [news-aggregator-lyart-seven.vercel.app](https://news-aggregator-lyart-seven.vercel.app)

> ⚠️ **Heads up on first load:** The server goes to sleep when nobody's using the app. The very first visit after a long gap might take up to 50 seconds to load — just give it a moment. Everything after that will be fast.

---

## What Can It Do?

- 🌍 Browse top headlines across 7 categories — General, Technology, Business, Health, Sports, Entertainment, and Science
- 🔍 Search for any topic you're curious about
- 🔖 Save articles to read later (needs a free account)
- 🕘 See your recent searches (when logged in)
- 🔐 Create an account and log in securely
- 🌗 Switch between light and dark mode

---

## Built With

**Frontend** — React, Tailwind CSS, Axios, React Router

**Backend** — Node.js, Express, MongoDB

**News Data** — [NewsAPI.org](https://newsapi.org)

**Hosted on** — Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## Run It Locally

You'll need: **Node.js v18+**, a free [MongoDB Atlas](https://www.mongodb.com/atlas) account, and a free [NewsAPI.org](https://newsapi.org) key.

### 1. Clone the project

```bash
git clone https://github.com/ishamankar17/news-aggregator.git
cd news-aggregator
```

### 2. Start the backend

```bash
cd news-aggregator-backend
npm install
cp .env.example .env
```

Open `.env` and fill in your details:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
NEWS_API_KEY=your_newsapi_key
NEWS_API_BASE_URL=https://newsapi.org/v2

JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d

CACHE_TTL_HEADLINES=300
CACHE_TTL_SEARCH=180
CACHE_TTL_SOURCES=3600

CORS_ORIGINS=http://localhost:5173
```

> Need a JWT secret? Run this in your terminal:
> `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

Then start the server:

```bash
npm run dev
```

The backend will be running at `http://localhost:5000/api`.

### 3. Start the frontend

Open a new terminal tab:

```bash
cd news-aggregator
npm install
cp .env.example .env
```

Make sure `.env` says:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Then run:

```bash
npm run dev
```

Open `http://localhost:5173` and you're good to go!

## A Few Limitations Worth Knowing

- **NewsAPI** (free plan) allows up to 100 requests per day.
- **MongoDB Atlas** (free tier) may pause if it goes unused for a very long time — it can be restarted from the Atlas dashboard.
- **Render** (free tier) puts the server to sleep after ~15 minutes of inactivity, causing that slow first load mentioned above.

---

## License

Built for learning and portfolio purposes.

---

## Author

**Isha Mankar** — [GitHub](https://github.com/ishamankar17)
