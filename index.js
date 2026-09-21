import express from "express"
import "dotenv/config"
import usuarioRoutes from "./src/routes/UsuarioRoutes.js";
import  rolRoutes  from "./src/routes/RolRoutes.js"
import  equipoRoutes  from "./src/routes/EquipoRoutes.js"
import  usuarioEquipoRoutes from "./src/routes/UsuarioEquipoRoutes.js"
import  tareaRoutes from "./src/routes/TareaRoutes.js"
import  authRoutes from "./src/routes/AuthRoutes.js"
import cors from "cors"

const app = express()

const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
app.use("/api/usuarios",usuarioRoutes )
app.use('/api/roles', rolRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/usuario-equipo', usuarioEquipoRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/auth', authRoutes);



app.get("/", (req,res) => {
    res.json({ message: "server in running"})
})

app.listen(port, () => {
    console.log(`serve is running on port http://localhost:${port}`);
    
})





