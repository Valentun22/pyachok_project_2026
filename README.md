# Pyachok

**Pyachok** is a platform for searching and rating bars, restaurants and other entertainment venues. The application allows users to quickly find the right establishment, read reviews, contacts and current events - without unnecessary clicks.

A separate feature of the project is the **Pyachok** function: the ability to plan a joint outing to an establishment, specifying the date, time, purpose of the meeting and company criteria (statute, number of people who will pay). Ideal for those looking for company for an evening.

## Main functionality

**For users:**
- Registration and login via email, Google, Facebook
- View, search and filter bookmarks by rating, type, average check, tags and features (Wi-Fi, parking, live music, etc.)
- Sort by rating, date, alphabet, distance
- Reviews and ratings of bookmarks
- Adding bookmarks to favorites
- Building a route to the establishment
- Writing a message to the establishment manager
- Bookmark news feed with sections: General, Promotions, Events

**For establishment owners:**
- Adding, editing and deleting your own establishment (after moderation by admin)
- Publishing news, promotions and events of the establishment
- Statistics of establishment page views by date

**Administrator:**
- Moderation of new establishments
- Management of all bookmarks, users and comments
- Access to full analytics of views
- Editing top categories (for example: "Best wedding venue")

## Stack

| | Technology |
|---|---|
| Backend | NestJS, TypeORM, PostgreSQL (PostGIS), Redis |
| Frontend | React, TypeScript, Redux |
| Storage | AWS S3 / MinIO |
| Auth | JWT, Google OAuth, Facebook OAuth |
| Email | Nodemailer / SMTP |
| Deploy | Docker, AWS ECS Fargate |

## Monorepo structure

```
pyachok_proj/
├── backend/          # NestJS API (port 3001)
├── frontend/         # React SPA (port 3000)
├── docker-compose.yml
├── .env.example
└── package.json      # handy scripts for root
```

---

## Quick Start (Local)

### 1. Settings `.env`
```bash
cp .env.example .env
# edit .env — fill in the secrets.
```

### 2. Running only infrastructure (DB + Redis + MinIO)
```bash
npm run docker:infra
```

### 3. Installing dependencies
```bash
npm run install:all
```

### 4. Running in dev mode
```bash
# terminal 1
npm run dev:backend

# terminal 2
npm run dev:frontend
```

- Backend: http://localhost:3001
- Swagger: http://localhost:3001/docs
- Frontend: http://localhost:3000
- MinIO console: http://localhost:8001

---

## Docker (full stack)

```bash
# Build and run everything
docker compose up -d --build

# Logs
docker compose logs -f

# Stop
docker compose down
```

---

### Important env variables for production

| Variable | Value |
|--------|---------|
| `POSTGRES_HOST` | RDS endpoint |
| `REDIS_HOST` | ElastiCache endpoint |
| `AWS_S3_ENDPOINT` | leave empty (uses native S3) |
| `REACT_APP_API_URL` | `https://api.yourdomain.com` (set during build) |
| `FRONTEND_URL` | `https://yourdomain.com` |

---

## Useful scripts

| Сommand | Action |
|---------|-----|
| `npm run docker:infra` | Run only the database, Redis, MinIO |
| `npm run docker:up` | Run the entire stack |
| `npm run docker:build` | Build Docker images |
| `npm run build:all` | Build a back and front |
| `npm run migration:run` | Run database migrations |
