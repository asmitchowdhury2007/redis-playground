import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Redis from "ioredis"

const app = express()
const PORT = process.env.PORT || 4003
app.use(express.json()) 

const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379" )

app.post("/notify", async(req,res)=>{
    const {title,message}= req.body
    if(!title || !message) return res.json({success:false , message: "No data given"})
    const notification = {title, message}
    await publisher.publish("notification", JSON.stringify(notification))
    return res.json({success : true, message : "Notification Published"})

})

app.listen(PORT , () => console.log("Server Running ..."))