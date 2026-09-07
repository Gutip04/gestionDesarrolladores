import express from "express"
import "dotenv/config" 
import { ObtenerEquipos } from "./src/models/equiposModel.js";

const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api" , equiposRouter)

app.get("/", (req,res) => {
    res.json({ message: "server in running"})
})

app.listen(port, () => {
    console.log(`serve is running on port ${port}`);
    
})

const tareas = await ObtenerEquipos();

console.log(tareas);
