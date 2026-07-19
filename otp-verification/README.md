# 🔐 OTP Verification API

A simple backend application built with **Node.js**, **Express.js**, and **Redis** to demonstrate OTP (One-Time Password) generation and verification. The project uses Redis for temporary data storage, automatic OTP expiration, and limiting incorrect verification attempts.

---

## 🚀 Features

- Generate a 6-digit OTP
- Store OTP in Redis
- Automatic OTP expiration using Redis TTL
- Verify OTP
- Track incorrect verification attempts
- Delete OTP after successful verification
- Input validation for Indian phone numbers
- RESTful API

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Redis
- ioredis
- dotenv

---

## 📁 Project Structure

```text
otp-verification/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/asmitchowdhury2007/redis-playground.git
cd otp-verification
```

### 2. Navigate to the project

```bash
cd otp-verification
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
PORT=3000
REDIS_URL=redis://localhost:6379
```

### 5. Start Redis

If Redis is installed locally:

```bash
redis-server
```

Or using Docker:

```bash
docker run -d --name redis -p 6379:6379 redis
```

### 6. Run the application

```bash
npm start
```

or (if using Nodemon)

```bash
npm run dev
```

---

# 📡 API Endpoints

## Generate OTP

**POST**

```
/generate-otp
```

### Request

```json
{
  "phoneNumber": "9876543210"
}
```

### Success Response

```json
{
  "message": "OTP Generated Successfully"
}
```

---

## Verify OTP

**POST**

```
/verify-otp/:phoneNumber
```

### Request

```json
{
  "otp": "123456"
}
```

### Success Response

```json
{
  "message": "OTP Verified Successfully"
}
```

### Invalid OTP Response

```json
{
  "message": "Invalid OTP"
}
```

---

# 🔄 OTP Verification Flow

```text
User enters phone number
          │
          ▼
Generate 6-digit OTP
          │
          ▼
Store OTP in Redis (30 seconds)
          │
          ▼
User enters OTP
          │
          ▼
Compare OTP with Redis
      ┌──────────────┐
      │              │
      ▼              ▼
Correct          Incorrect
  │                  │
Delete OTP      Increase Attempts
  │                  │
Success      Retry Until Limit
```

---

# 🧠 Redis Concepts Used

| Command | Purpose |
|----------|---------|
| `SET` | Store OTP |
| `GET` | Retrieve OTP |
| `EX` | Set expiration time |
| `TTL` | Check remaining expiry time |
| `DEL` | Delete OTP after successful verification |
| `INCR` | Count invalid verification attempts |

### Example

Store OTP for 30 seconds

```bash
SET otp:9876543210 123456 EX 30
```

Check remaining time

```bash
TTL otp:9876543210
```

Retrieve OTP

```bash
GET otp:9876543210
```

Increase attempt count

```bash
INCR attempts:9876543210
```

Delete OTP

```bash
DEL otp:9876543210
```

---

# 🧪 Testing

You can test the APIs using:

- Postman
- Thunder Client
- cURL

---

# 📚 What I Learned

- Integrating Redis with Node.js using ioredis
- Temporary data storage with Redis
- Using TTL for automatic key expiration
- OTP authentication workflow
- Express.js routing and request handling
- Environment variable management using dotenv
- Input validation
- Building REST APIs

---

# 🚀 Future Improvements

- Send OTP via SMS using Twilio/Fast2SMS
- Resend OTP endpoint
- JWT authentication after verification
- Docker Compose setup
- Swagger API documentation
- Rate limiting based on IP address
- Logging and monitoring

---

## 👨‍💻 Author

**Asmit Chowdhury**

- GitHub: https://github.com/asmitchowdhury2007

---

## ⭐ Support

If you found this project useful or learned something from it, consider giving it a ⭐ on GitHub.