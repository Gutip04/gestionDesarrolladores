import { db } from "../db/database.js";


export const obtenerRoles = async () => {
    try {
        const [rows] = await db.query(
            `SELECT * FROM roles`
        );
        return rows;

    } catch (error) {
        console.error('Error al obtener los roles:', error);
        throw error;
    }
};