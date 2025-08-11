import { prisma } from "../../prisma";
import { Queue, Worker } from "bullmq";
import { enqueueNote } from ".";

export const versionQueue = new Queue("version", {
    connection: {host: "localhost", port: 6379}
})
console.log("Version Worker is Listening")
export const versionWorker = new Worker("version", async (job)=>{
    
    if (job.name === "bumpVersion"){
        const { neuroId } = job.data
        console.log("Updating the version and Ingestion flag", neuroId)
        await prisma.note.update({
            where: { id: neuroId },
            data: { 
                version: { 
                    increment: 1 
                },
                needs_ingestion: true
            }
        });
        console.log("Passing the neuroID to neurofy worker")
        if (neuroId){
            await enqueueNote(neuroId)
        }else{
            throw new Error("Error while enqueueing")
        }
    }
}, {
    connection: { host: "localhost", port: 6379 },
})