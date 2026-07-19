# 👤 User Profile Data API

A simple backend project built with **Node.js**, **Express.js**, and **Redis** that demonstrates two different ways of storing user profile data in Redis:

- **JSON String Storage**
- **Redis Hash Storage**

This project is useful for understanding when to use Redis Strings vs Redis Hashes and how to retrieve data from both.

---

## 🚀 Features

- Store user profile as a JSON string
- Retrieve user profile from JSON storage
- Store user profile as a Redis Hash
- Retrieve user profile from Redis Hash
- RESTful API
- Environment variable support

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
user-profile-data/
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
```

### 2. Navigate to the project

```bash
cd user-profile-data
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
PORT=4003
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

or

```bash
npm run dev
```

---

# 📡 API Endpoints

## 1️⃣ Store User Profile as JSON

**POST**

```
/user/json/:id
```

### Example Request

```json
{
    "name": "XYZ",
    "age": 19,
    "email": "xyz@gmail.com",
    "city": "ABC"
}
```

### Success Response

```json
{
    "message": "User Data Stored as JSON"
}
```

---

## 2️⃣ Get User Profile from JSON

**GET**

```
/user/json/:id
```

### Example Response

```json
{
    "message": {
        "name": "XYZ",
        "age": 19,
        "email": "xyz@gmail.com",
        "city": "ABC"
    }
}
```

---

## 3️⃣ Store User Profile as Redis Hash

**POST**

```
/user/hash/:id
```

### Example Request

```json
{
    "name": "XYZ",
    "age": 19,
    "email": "xyz@gmail.com",
    "city": "ABC"
}
```

### Success Response

```json
{
    "message": "User Data stored as Hash"
}
```

---

## 4️⃣ Get User Profile from Redis Hash

**GET**

```
/user/hash/:id
```

### Example Response

```json
{
    "message": {
        "name": "XYZ",
        "age": "19",
        "email":"xyz@gmail.com",
        "city": "ABC"
    }
}
```

> **Note:** Redis Hash stores all values as strings, so numeric values like `age` are returned as strings.

---

# 🧠 Redis Concepts Used

## Redis String

Stores the entire object as a single JSON string.

```bash
SET profile-data:1 "{\"name\":\"Asmit\",\"age\":19}"
```

Retrieve the stored JSON string:

```bash
GET profile-data:1
```

In the application, the JSON string is converted back into an object using:

```javascript
JSON.parse(data)
```

---

## Redis Hash

Stores each property of the object as an individual field.

Example:

```bash
HSET profile-data:1 name XYZ age 19 email xyz@gmail.com city ABC
```

Retrieve all fields:

```bash
HGETALL profile-data:1
```

---

# 📊 JSON vs Hash

| JSON String | Redis Hash |
|-------------|------------|
| Entire object stored as one value | Each property stored separately |
| Requires `JSON.stringify()` before storing | No conversion required |
| Requires `JSON.parse()` after retrieving | Returns an object directly |
| Updating one field requires rewriting the whole object | Individual fields can be updated using `HSET` |
| Suitable for complete object storage | Suitable for frequently updated fields |

---

# 🧪 Testing

The APIs can be tested using:

- Postman
- Thunder Client
- cURL

---

# 📚 What I Learned

- Connecting Node.js with Redis using ioredis
- Redis String operations (`SET`, `GET`)
- Redis Hash operations (`HSET`, `HGETALL`)
- Using `JSON.stringify()` and `JSON.parse()`
- Express.js routing
- REST API development
- Environment variable management with dotenv

---

# 🚀 Future Improvements

- Update individual profile fields
- Delete user profiles
- Add Redis TTL support
- Input validation
- Authentication using JWT
- Docker Compose setup
- Error handling middleware
- TypeScript support

---

## 👨‍💻 Author

**Asmit Chowdhury**

GitHub: https://github.com/asmitchowdhury2007

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.