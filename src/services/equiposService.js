import { ObtenerEquipos } from "../models/equiposModel.js";

export const ObtenerTodosEquipos = async () => {
    const equipos = await ObtenerEquipos();

    try {
        return(equipos);
    } 
    catch (error) {
        console.log(error)
    }
    
}