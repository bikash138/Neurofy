import express from 'express'
import { notesRoute } from './routes/notes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', notesRoute)






// async function postData() {
//     const response = await axios.post('http://localhost:8000/ai-server', data)
//     console.log(response.data)
// }
// postData();


app.listen(4000, () => {
    console.log("Server is Running at PORT 4000")
})