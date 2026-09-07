import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const {
    DB_HOST,
    DB_USER,
    DB_PORT,
    DB_PASS,
    DB_NAME,
} = process.env;


if (
    DB_HOST === undefined ||
    DB_USER === undefined ||
    DB_PORT === undefined ||
    DB_PASS === undefined ||
    DB_NAME === undefined
) {
    throw new Error('1 o mas variables de entorno no estan definidas');
}

export const db = mysql.createPool({
    host: DB_HOST,
    user: DB_NAME,
    port: parseInt(process.env.DB_PORT, 80),
    password: DB_PASS ?? '',
    multipleStatements: true

})