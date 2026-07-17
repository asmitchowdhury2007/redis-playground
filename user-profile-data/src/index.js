import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Redis from "ioredis"

const app = express()
const PORT = process.env.PORT || 4003
app.use(express.json())

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

function setKey(id){
    return `profile-data:${id}`
}

// user profile data in json form 

app.post("/user/json/:id", async(req,res)=>{
    const data = req.body 
    if(!data) return res.json({message : "No data provided"})
    await redis.set(setKey(req.params.id), JSON.stringify(data))
    return res.json({message : "User Data Stored as JSON"});

})

app.get("/user/json/:id", async(req,res)=>{
    const data = await redis.get(setKey(req.params.id))
    if (!data) return res.json({message : "User Data doesnot exist"})
    return res.json({message : JSON.parse(data)})
    
})

//user profile data in hash form

app.post("/user/hash/:id", async(req,res)=>{
    const data = req.body
    if(!data) return res.json({message : "No data provided"})
    await redis.hset(setKey(req.params.id), data)
    return res.json({message : "User Data stored as Hash"})
})

app.get("/user/hash/:id", async(req,res)=>{
    const data = await redis.hgetall(setKey(req.params.id));
    if(!data) return res.json({message : "User Data doesnot exist"})
    return res.json({message : data})

})

app.listen(PORT, () => console.log("Server Running"))