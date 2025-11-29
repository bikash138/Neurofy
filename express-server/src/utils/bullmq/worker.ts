import { prisma } from "../../lib/prisma"
import axios from "axios";
import { Worker } from "bullmq";
console.log("Neurofy Worker is Listening")
const processNoteWorker = new Worker(
    "neurofy", 
    async (job) => {
    try {
      console.log("Neurofy Worker received job:", job.name, job.data);
      const neuroId = job.data?.neuroId      
      console.log(`Sending NoteId: ${neuroId} to AI-Server`)
      const response  = await axios.post("http://localhost:8000/ai-server", {neuroId})
      console.log("AI-Engine Response: ", response.data)
      const {plain_text} = response.data
      if(response.data.success){
        try{
          console.log("About to update note in DB");
          await prisma.note.update({
            where: { id: neuroId },
            data: {
              contentText: plain_text,
              needs_ingestion: false,
              last_ingested_version: { increment: 1 },
            }
          });
          console.log("Note update completed");
        }catch(error){
          console.log("Worker Error at updating Content Text: ", error)
        }
      }
    } catch (error) {
      console.error("Worker error:", error);
    }
  },
  {
    concurrency: 100,
    connection: { host: "localhost", port: 6379 },
  }
);