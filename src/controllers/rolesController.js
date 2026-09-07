import { obtenerTodosRoles } from "../services/rolesServices.js"


export const traerRoles = async (req, res) => {
    try {
        const roles = await obtenerTodosRoles()
        res.status(200).json({ data: roles})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "error al obtener los roles"})
        
    }
} 