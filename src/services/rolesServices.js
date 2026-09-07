import { obtenerRoles } from "../models/rolesModel.js"

export const obtenerTodosRoles = async () => {
    
    const roles = await obtenerRoles()

    return roles
}