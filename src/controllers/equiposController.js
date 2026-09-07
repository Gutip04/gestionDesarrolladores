import { ObtenerTodosEquipos } from "../services/equiposService.js";

export const TraerEquipos = async (req, res) => {
    try {
        const equipos = await ObtenerTodosEquipos();
        res.status(200).json({data: equipos});
    } catch (error) {
        console.log(error);
        res.status(500).json({menssage: "Error al obtener equipos"});
    }
}