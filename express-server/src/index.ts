import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notesRoute } from "./routes/notes";
import cors from "cors";
import { voiceUploadS3 } from "./routes/s3/voiceUpload";
import { voiceNotesRoute } from "./routes/voice-nots";
import { clerkWebhookRoute } from "./routes/clerkWebhook";

const app = express();

app.use("/api/v1", clerkWebhookRoute); 

app.use(express.json());
app.use(cors());

app.use("/api/v1", notesRoute);
app.use("/api/v1", voiceUploadS3);
app.use("/api/v1", voiceNotesRoute);

// async function postData() {
//     const response = await axios.post('http://localhost:8000/ai-server', data)
//     console.log(response.data)
// }
// postData();

app.listen(4000, () => {
  console.log("Server is Running at PORT 4000");
});
