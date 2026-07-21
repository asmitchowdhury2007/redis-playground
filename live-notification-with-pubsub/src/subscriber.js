import dotenv from "dotenv"
dotenv.config()
import Redis from "ioredis"

const subscriber = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

subscriber.subscribe("notification", (err,count)=>{
    if(err){
        console.error("Failed to subscribe:", err);
        process.exit(1)
    }
    console.log(`Subscribe to ${count} channel`)
    console.log("Waiting for notifications...\n");
})

subscriber.on("message", (channel,message)=>{
    console.log("Channel :", channel)
    const notification = JSON.parse(message)
    console.log(notification)

})