import {db} from "../db/database.js"

export const ObtenerEquipos = async () => {
    try {
        const [rows] = await db.query(
            `SELECT * FROM equipos`
        )
        return rows

    } catch (error) {
        console.log("Error al obtener los equipos ", error)
    }
}

