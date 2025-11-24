import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { notesRoute } from './routes/notes'
import cors from 'cors'
import { voiceNoteRoute } from './routes/s3/voiceUpload'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', notesRoute)
app.use('/api/v1', voiceNoteRoute)






// async function postData() {
//     const response = await axios.post('http://localhost:8000/ai-server', data)
//     console.log(response.data)
// }
// postData();


app.listen(4000, () => {
    console.log("Server is Running at PORT 4000")
})