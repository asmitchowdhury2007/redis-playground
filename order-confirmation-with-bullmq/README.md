# Order Confirmation with BullMQ

A simple Node.js project demonstrating how to use **BullMQ** with **Redis** to process background jobs. When an order is placed, the API immediately responds to the client while a BullMQ worker processes the order confirmation in the background.

---

## Features

- Express.js REST API
- BullMQ Job Queue
- Redis Integration
- Background Worker
- Automatic Job Retries
- Exponential Backoff
- Order Confirmation Simulation

---

## Tech Stack

- Node.js
- Express.js
- BullMQ
- Redis
- ioredis
- Nodemon

---

## Project Structure

```
order-confirmation-with-bullmq
│
├── src
│   ├── index.js          # Express Server
│   ├── queue.js          # Queue & Redis Connection
│   └── worker.js         # Background Worker
│
├── package.json
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone redis-playground
```

Navigate to the project

```bash
cd order-confirmation-with-bullmq
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=4003

REDIS_HOST=localhost
REDIS_PORT=6379

QUEUE_NAME=orderQueue
```

---

## Start Redis

If using Docker:

```bash
docker start redis-stack
```

Verify Redis:

```bash
redis-cli ping
```

Expected Output

```
PONG
```

---

## Run the Express Server

```bash
npm run dev
```

---

## Run the Worker

Open another terminal.

```bash
node src/worker.js
```

The worker continuously listens for new jobs from Redis.

---

## API Endpoint

### Place Order

**POST**

```
/orders
```

### Request Body

```json
{
  "email": "john@example.com",
  "product": "Laptop"
}
```

### Response

```json
{
  "success": true,
  "message": "Order Placed Successfully"
}
```

---

## How It Works

```
Client
   │
POST /orders
   │
   ▼
Express Server
   │
Save Order
   │
Add Job to BullMQ
   │
Return Response
   │
   ▼
Redis Queue
   │
   ▼
BullMQ Worker
   │
Send Confirmation Email
   │
Generate Invoice
   │
Complete Job
```

---

## Job Configuration

```js
await OrderQueue.add("send-confirmation", order, {
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 2000,
    },
});
```

### attempts

Retries the job if it fails.

```
attempts: 3
```

BullMQ retries the job up to **3 times**.

---

### backoff

Waits before retrying.

```
2 sec
↓

4 sec
↓

8 sec
```

This prevents overwhelming external services.

---

## Worker Events

### Completed

```js
worker.on("completed", (job) => {
    console.log(`Job ${job.id} Completed`);
});
```

---

### Failed

```js
worker.on("failed", (job, err) => {
    console.log(err);
});
```

---

## Dependencies

```text
express
bullmq
ioredis
dotenv
nodemon
```

---

## Learning Outcomes

- Redis Basics
- BullMQ Queues
- Background Job Processing
- Worker Processes
- Retry Mechanism
- Exponential Backoff
- Express Integration

---

## Future Improvements

- Real Email Sending using Nodemailer
- MongoDB Order Storage
- Bull Board Dashboard
- Delayed Jobs
- Scheduled Jobs
- Priority Queues
- Dead Letter Queue
- Docker Compose Support

---

## License

This project is created for learning purposes.