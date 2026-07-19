# 🚩 Site Banner API

A lightweight REST API built with **Node.js**, **Express.js**, and **Redis** to manage a site-wide banner message.

The API allows you to create, retrieve, validate, and delete a banner while storing the data in Redis for fast access.

---

## ✨ Features

* Create or update a site banner
* Retrieve the current banner
* Check if a banner exists
* Delete the banner
* Redis-based storage
* Environment variable support using `dotenv`

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Redis
* ioredis
* dotenv

---

## 📂 Project Structure

```text
site-banner/
├── src/
│   ├── index.js
│   └── ...
├
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/asmitchowdhury2007/redis-playground.git
cd site-banner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Redis

If Redis is running locally:

```text
redis://localhost:6379
```

Or start Redis using Docker:

```bash
docker run -d --name redis -p 6379:6379 redis
```

### 4. Create a `.env` file

```env
PORT=4003
REDIS_URL=redis://localhost:6379
```

### 5. Start the server

```bash
npm start
```

The server will run at:

```text
http://localhost:4003
```

---

# 📌 API Endpoints

## 1. Create or Update Banner

**POST** `/banner`

### Request Body

```json
{
  "message": " Website maintenance tonight from 11 PM."
}
```

### Response

```json
{
  "success": true
}
```

---

## 2. Get Banner

**GET** `/banner`

### Response

```json
{
  "message": " Website maintenance tonight from 11 PM."
}
```

---

## 3. Check Banner Status

**GET** `/banner/exist`

### Response (Banner Exists)

```json
{
  "message": "banner valid"
}
```

### Response (Banner Doesn't Exist)

```json
{
  "message": "Banner invalid"
}
```

---

## 4. Delete Banner

**DELETE** `/banner`

### Response

```json
{
  "success": true
}
```

---

# 🔑 Environment Variables

| Variable    | Description                           |
| ----------- | ------------------------------------- |
| `PORT`      | Port on which the Express server runs |
| `REDIS_URL` | Connection URL for the Redis server   |

Example:

```env
PORT=4003
REDIS_URL=redis://localhost:6379
```

---

# 📚 Redis Commands Used

| Command  | Purpose                         |
| -------- | ------------------------------- |
| `SET`    | Store or update the banner      |
| `GET`    | Retrieve the banner             |
| `DEL`    | Delete the banner               |
| `EXISTS` | Check whether the banner exists |

---

# 🧠 What I Learned

* Building REST APIs with Express.js
* Connecting Node.js to Redis using ioredis
* Using `express.json()` middleware to parse JSON requests
* Managing configuration with environment variables
* Performing basic Redis operations (`SET`, `GET`, `DEL`, `EXISTS`)
* Using Redis as a fast in-memory key-value database

---



