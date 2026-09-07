import express from "express"
import "dotenv/config" 
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/", (req,res) => {
    res.json({ message: "server in running"})
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    
})

