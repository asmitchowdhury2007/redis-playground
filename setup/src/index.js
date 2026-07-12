import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import {Redis}  from "ioredis"

const app = express()

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")


app.get("/redis", async(req,res)=>{
    const reply = await redis.ping();
    res.json({redis: reply});
});

app.get("/mongo", async(req,res)=>{
    const URL = process.env.MONGO_URL || "mongodb://localhost:27017/chaiRedis";
    if(mongoose.connection.readyState=== 0){
        await mongoose.connect(URL).then(()=> console.log("MongoDB Running..."))

    }
    res.json({mongodb: "connected"});

})

app.listen(process.env.PORT, () => console.log("Server Running..."))