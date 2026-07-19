import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Redis from "ioredis"

const app = express()
const PORT = process.env.PORT || 4003
app.use(express.json()) 
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")



app.post("/email",async(req,res)=>{
    if(! req.body) return res.json({messsge : "Data is not provided"})
    const job = {
        to: req.body.to,
        subject: req.body.subject || "No Subject",
        body : req.body.body
    }
    await redis.lpush("email-queue", JSON.stringify(job))
    return res.json({message : "Details Added"})
})

app.get("/email", async(req,res)=>{
    const rawjob = await redis.rpop("email-queue")
    if(!rawjob) return res.json({message : "Nothing is present"})
    const job = JSON.parse(rawjob)
    return res.json({item : job})
})


app.listen(PORT , () => console.log("Server Running ..."))
