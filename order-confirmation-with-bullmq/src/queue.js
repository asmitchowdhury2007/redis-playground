import {Queue} from "bullmq"

    
const connection ={
    host : "localhost",
    port: 6379
}
const OrderQueue = new Queue("OrderQueue", {connection})

export {
    connection,
    OrderQueue
}