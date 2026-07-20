import dotenv from "dotenv"
dotenv.config()
import express from "express"
import {OrderQueue} from "./queue.js"

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4003

app.post("/orders", async(req,res)=>{
    const {email,product} = req.body
    const order = {
        id: Date.now(),
        email,
        product,
    };
    await OrderQueue.add("send-confirmation",order,{
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000,
        },

    }
    )
    return res.json({
        success : true,
        message : "Order Placed Successfully"
    })

})

app.listen(PORT , () => console.log("Server Running..."))