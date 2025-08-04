import axios from 'axios'
import express from 'express'

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello from Server")
})
const data = {
    message: "Hello from Express Server"
}


// async function postData() {
//     const response = await axios.post('http://localhost:8000/ai-server', data)
//     console.log(response.data)
// }
// postData();


app.listen(4000, () => {
    console.log("Server is Running at PORT 4000")
})