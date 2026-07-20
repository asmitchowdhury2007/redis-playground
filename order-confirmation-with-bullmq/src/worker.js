import {Worker} from "bullmq"
import {connection,OrderQueue } from "./queue.js"

const worker = new Worker(
    "orderQueue",
    async(job) =>{
        console.log("Processing Order...")
        console.log(job.data);
        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });

        console.log(
            `Email sent to ${job.data.email}`
        );

    },
    {
        connection
    }
)

worker.on("completed", (job)=>{
    console.log(`Job ${job.id} Completed`)
})

worker.on("failed", (job,err)=>{
    console.log(err.message)
})