import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Redis from "ioredis"

const PORT = process.env.PORT || 4003
const app = express()
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

const BANNER_KEY = "app:banner"

app.post("/banner", async(req,res)=>{
    await redis.set(BANNER_KEY, req.body.message);
    return res.json({success : true})
})

app.get("/banner", async(req,res)=>{
    const message = await redis.get(BANNER_KEY);
    return res.json({message});

})

app.delete("/banner",async(req,res)=>{
    await redis.del(BANNER_KEY);
    return res.json({success:true});
})

app.get("/banner/exist", async(req,res)=>{
    const exist = await redis.exists(BANNER_KEY);
    if(!exist) return res.json({message: "Banner invalid"});
    return res.json({message:"banner valid"});
})

app.listen(PORT, () => console.log("Server Running ..."));