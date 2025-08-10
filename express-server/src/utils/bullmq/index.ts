import { Queue } from "bullmq";

const noteTasksQueue = new Queue("neurofy", 
  {
    connection: { host: "localhost", port: 6379 },
  }
);


export async function enqueueNote(neuroId: string) {
  await noteTasksQueue.add("process-note", { neuroId });
} 