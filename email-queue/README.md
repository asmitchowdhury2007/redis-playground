# Email Queue using Redis Lists

A simple Node.js project demonstrating how to implement an **Email Queue** using **Redis Lists** (`LPUSH` and `RPOP`) with **ioredis** and **Express.js**.

## 📁 Project Structure

```text
email-queue/
│── src/
│   └── index.js
│── package.json
│── .env
│── README.md
```

---

## 🚀 Features

- Add email jobs to a Redis queue.
- Retrieve email jobs in **FIFO (First In, First Out)** order.
- Uses Redis Lists.
- Built with Express.js and ioredis.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Redis
- ioredis
- dotenv

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd email-queue
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Redis

If Redis is installed locally:

```bash
redis-server
```

Or using Docker:

```bash
docker run -d --name redis -p 6379:6379 redis
```

### 4. Create a `.env` file

```env
PORT=4003
REDIS_URL=redis://localhost:6379
```

---

## ▶️ Run the project

```bash
npm start
```

or (if using nodemon)

```bash
npm run dev
```

The server will run on:

```
http://localhost:4003
```

---

# API Endpoints

## 1. Add an Email Job

**POST**

```
/email
```

### Request Body

```json
{
  "to": "user@example.com",
  "subject": "Welcome",
  "body": "Thanks for signing up!"
}
```

### Response

```json
{
  "message": "Details Added"
}
```

This endpoint pushes an email job into the Redis list named:

```
email-queue
```

using:

```javascript
redis.lpush("email-queue", JSON.stringify(job));
```

---

## 2. Consume an Email Job

**GET**

```
/email
```

### Response

```json
{
  "item": {
    "to": "user@example.com",
    "subject": "Welcome",
    "body": "Thanks for signing up!"
  }
}
```

If the queue is empty:

```json
{
  "message": "Nothing is present"
}
```

This endpoint removes an email job from the queue using:

```javascript
redis.rpop("email-queue");
```

---

# Queue Flow

```
Client
   │
   │ POST /email
   ▼
LPUSH
   │
   ▼
+----------------------+
|     email-queue      |
+----------------------+
   │
   │ GET /email
   ▼
RPOP
   │
   ▼
Consumer
```

---

# Why LPUSH + RPOP?

Using:

- **LPUSH** to insert
- **RPOP** to remove

creates a **FIFO (First In, First Out)** queue.

Example:

```
LPUSH Job1
LPUSH Job2
LPUSH Job3

Redis List

Head                     Tail

Job3 → Job2 → Job1

RPOP

Job1
Job2
Job3
```

The oldest job is processed first.

---

# Redis Commands Used

| Command | Purpose |
|----------|---------|
| LPUSH | Add a job to the queue |
| RPOP | Remove the oldest job |
| LLEN | Get queue length |
| LRANGE | View queue contents |

Example:

```bash
LLEN email-queue
```

```bash
LRANGE email-queue 0 -1
```

---

# Dependencies

```json
{
  "express": "^5.x",
  "ioredis": "^5.x",
  "dotenv": "^17.x"
}
```

---

# Future Improvements

- Email worker using Nodemailer
- Background job processing
- Retry failed emails
- Delayed jobs
- Dead Letter Queue (DLQ)
- BullMQ integration
- Email status tracking
- Logging and monitoring

---

# License

This project is intended for learning and educational purposes.