import express from "express"
import "dotenv/config"
import rolesRouter from "./src/routes/rolesRoutes.js";
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api", rolesRouter)



app.get("/", (req,res) => {
    res.json({ message: "server in running"})
})

app.listen(port, () => {
    console.log(`serve is running on port http://localhost:${port}`);
    
})





