#  Redis + PostgreSQL Analytics Dashboard  
A full-stack performance demo showcasing **Redis caching (Streams + RedisJSON)** vs **PostgreSQL** using a real dashboard built with:

- **React + TypeScript** (Recharts + AG Grid)
- **Node.js + Express**
- **Redis Stack** (for Streams + JSON)
- **PostgreSQL** (with 1M time-series rows)
- **Docker Compose** orchestration

This project visualizes the performance difference between Redis and PostgreSQL by serving the same data via two different endpoints:
- `/postgres` → slow path  
- `/redis` → fast cached path  

---

##  Features

###  Backend  
- Redis Streams for time-series caching  
- RedisJSON for tabular caching  
- PostgreSQL seeded with **1,000,000 metrics** + **50,000 items**  
- Auto-seeding using `/docker-entrypoint-initdb.d/seed.sql`  
- Clean API structure with caching logic  

###  Frontend  
- Recharts for time-series CPU graph  
- AG Grid for high-performance large table rendering  
- TypeScript everywhere  
- UI shows latency + cache HIT/MISS  

###  DevOps  
- Fully containerized with Docker Compose  
- Redis Stack UI available at `localhost:8001`  
- Postgres persisted using Docker volumes  
- Production-ready Nginx build for frontend  

---
```sh
##  Project Structure
redisImp/
├── backend/
│ ├── src/
│ ├── Dockerfile
│ └── .dockerignore
├── frontend/
│ ├── src/
│ ├── Dockerfile
│ └── .dockerignore
├── db/
│ └── seed.sql # 1M metrics + 50k items
└── docker-compose.yml
```
---

## 🐳 Run With Docker (Recommended)

  
```sh
1. Start everything
docker compose up --build

2. Access the services
Service	URL
Frontend (Nginx)	http://localhost:5173

Backend API	http://localhost:4000

Redis Stack UI	http://localhost:8001

PostgreSQL	localhost:5432

⚠️ The first time you run it, Postgres will seed 1M+ rows automatically.
This takes ~15–25 seconds depending on machine.

🧪 API Endpoints
Streams (Recharts)
GET /api/streams/postgres
GET /api/streams/redis

Items Table (AG Grid)
GET /api/table/postgres
GET /api/table/redis


Each returns:

{
  "data": [...],
  "latency_ms": 12,
  "cache": "HIT" | "MISS" | "POSTGRES"
}

🏗 Tech Stack
Frontend

React 18
TypeScript
Vite
Recharts
AG Grid

Backend

Node.js + Express
Redis (Streams, RedisJSON)
PostgreSQL
pg-pool

Infrastructure

Docker / Docker Compose
Redis Stack
Nginx

📜 How Seeding Works

Inside docker-compose.yml:

- ./db:/docker-entrypoint-initdb.d


This uses the official Postgres feature where any .sql file in this folder runs automatically during the first DB initialization.

Your seed.sql drops and recreates:

metrics (1M rows)

items (50k rows)

Indexes

🧼 Reset Database & Seed Again
docker compose down -v
docker compose up --build

🛠 Development (without Docker)
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

📌 Future Enhancements

Add server-side pagination for AG Grid

Add Redis performance benchmark page

Add real-time graph updates

GitHub Actions CI/CD

Deploy on Render / Railway / Fly.io / AWS ECS

📝 License

MIT License.
