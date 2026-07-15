import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Redis from "ioredis"


const app = express();
const PORT = process.env.PORT ||  4003
app.use(express.json()) 
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

function setKey(phoneNumber){
    return `otp:${phoneNumber}`
}

function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post("/otp", async(req,res)=>{
    const {phoneNumber} = req.body     
    const phoneRegex = /^[6-9]\d{9}$/
    if (! phoneRegex.test(phoneNumber)) return res.json({message : "Phone Number is not valid"});
    const otp = generateOTP()
    await redis.set(setKey(phoneNumber), otp, "EX", 60)
    await redis.del(`attempts:${phoneNumber}`)
    return res.json({success : true , otp })  
    
})

app.post("/otp/verify", async(req,res)=>{

    const {phoneNumber,otp} = req.body
    const storedOTP = await redis.get(setKey(phoneNumber))
    
    if(!storedOTP) return res.json({success : false , message : "OTP expired or phone number not found"})
    if(storedOTP !== otp){
        
        const attempts = await redis.incr(`attempts:${phoneNumber}`)
        if (attempts === 1) {
            await redis.expire(`attempts:${phoneNumber}`, 60);
        }
        if(attempts === 1 || attempts === 2){
            return res.json({success : false , message :`Invalid OTP .... You have ${3-attempts} attempts left`})
        }
        if(attempts >= 3){
            await redis.del(setKey(phoneNumber))
            return res.json({success : false , message : "Max Attempts Done ... Create a new OTP"})

        }
    }
    
    return res.json({success : true , message : "OTP Verification Done"});
    
})

app.get("/:phoneNumber/ttl", async(req,res) =>{
    const {phoneNumber} = req.params
    const ttl = await redis.ttl(setKey(phoneNumber));
    return res.json({ttl});
})

app.listen(PORT , () => console.log("Server Running..."));