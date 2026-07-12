# Redis Basic Setup 🚀

This project is the initial setup for learning Redis with Node.js. It provides a Docker-based development environment using **Redis** and **MongoDB**, along with an **Express.js** server to experiment with Redis features and backend development.

## 📌 Tech Stack

- Node.js
- Express.js
- Redis
- MongoDB
- Mongoose
- ioredis
- Docker & Docker Compose
- dotenv

---

## 📂 Project Structure

```
setup/
├── src/
│   ├── index.js
│   └── ...
├── .env
├── .gitignore
├── package.json
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Prerequisites

- Node.js (v20+ recommended)
- Docker Desktop
- Git

---

## 🐳 Docker Setup

Start MongoDB and Redis containers:

```bash
docker compose up -d
```

Stop the containers:

```bash
docker compose down
```

Check running containers:

```bash
docker ps
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=3000

MONGO_URI=mongodb://localhost:27017/chaiRedis

REDIS_URL=redis://localhost:6379
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run the Project

Development mode:

```bash
npm run dev
npm start
```

---

## 🛠 Features Implemented

- ✅ Express server setup
- ✅ MongoDB connection using Mongoose
- ✅ Redis connection using ioredis
- ✅ Docker Compose setup
- ✅ Environment variable configuration
- ✅ Basic connection testing

---



## 📖 Learning Goal

The purpose of this project is to gain hands-on experience with Redis by building practical backend applications 

```
