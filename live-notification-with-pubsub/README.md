# Redis Pub/Sub Notification System

A simple real-time notification system built with **Node.js**, **Express**, and **Redis Pub/Sub** to demonstrate the Publisher–Subscriber messaging pattern.

## 📌 Overview

This project demonstrates how Redis Pub/Sub enables real-time communication between different services.

* **Publisher (`api.js`)** receives notification requests via an API and publishes them to a Redis channel.
* **Subscriber (`subscriber.js`)** listens to the Redis channel and processes notifications as soon as they are published.

> **Note:** Redis Pub/Sub is designed for real-time messaging. Messages are **not stored**. If no subscriber is listening when a message is published, the message is lost.

---

## 🏗️ Architecture

```text
                Client (Postman)
                       │
              POST /notify
                       │
                       ▼
             api.js (Publisher)
                       │
        PUBLISH notification
                       │
                 Redis Server
                       │
        notification channel
                       │
                       ▼
        subscriber.js (Subscriber)
                       │
             Display Notification
```

---

## 📂 Project Structure

```text
live-notification-with-pubsub/
│
├── src/
│   ├── api.js
│   └── subscriber.js
│
├── package-lock.json
├── package.json
└── README.md
```

---

## 🚀 Tech Stack

* Node.js
* Express.js
* Redis
* ioredis
* dotenv

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
cd redis-pubsub-notification
```

### Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=4003
REDIS_URL=redis://localhost:6379
```

---

## Running Redis

### Using Docker

```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis
```

Or use your existing local Redis server.

---

## Running the Project

Open **two terminals**.

### Terminal 1

Start the subscriber.

```bash
node src/subscriber.js
```

Output:

```text
Subscribed to 1 channel(s).
Waiting for notifications...
```

---

### Terminal 2

Start the API server.

```bash
node src/api.js
```

Output:

```text
Server Running...
```

---

## API Endpoint

### Publish Notification

**POST**

```http
http://localhost:4003/notify
```

### Request Body

```json
{
    "title": "Order Confirmed",
    "message": "Your order has been placed successfully."
}
```

### Success Response

```json
{
    "success": true,
    "message": "Notification Published"
}
```

---

## Subscriber Output

```text
📢 New Message Received

Channel: notification

Title: Order Confirmed

Message: Your order has been placed successfully.

-----------------------------
```

---

## How It Works

1. A client sends a notification to the `/notify` endpoint.
2. `api.js` publishes the notification to the **notification** channel.
3. Redis immediately forwards the message to every active subscriber.
4. `subscriber.js` receives the message and displays it.

---

## Redis Pub/Sub Concepts

### Publisher

A publisher sends messages to a Redis channel without knowing who will receive them.

```javascript
publisher.publish(channel, message);
```

---

### Subscriber

A subscriber listens to one or more Redis channels and reacts whenever a message is published.

```javascript
subscriber.subscribe(channel);
```

---

### Channel

A channel is a logical communication path between publishers and subscribers.

Example channels:

* notification
* chat
* orders
* payments

---

## Pub/Sub vs Redis SET

| Redis SET                              | Redis Pub/Sub                       |
| -------------------------------------- | ----------------------------------- |
| Stores data                            | Broadcasts messages                 |
| Uses key-value pairs                   | Uses channel-message pairs          |
| Data persists until deleted or expired | Messages are not stored             |
| Retrieved using GET                    | Received only by active subscribers |

---

## Learning Outcomes

This project demonstrates:

* Redis Pub/Sub architecture
* Publisher–Subscriber messaging pattern
* Real-time communication
* Express REST APIs
* Redis channels
* JSON serialization (`JSON.stringify`)
* JSON deserialization (`JSON.parse`)
* Event-driven programming in Node.js

---

## Author

**Asmit Chowdhury**

Backend Developer | Learning Redis