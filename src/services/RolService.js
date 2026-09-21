import { 
  obtenerTodosLosRoles, 
  obtenerRolPorId, 
  crearRol, 
  actualizarRol, 
  eliminarRol 
} from '../models/RolModel.js';

export const listarRolesService = async () => {
  return await obtenerTodosLosRoles();
};

export const obtenerRolPorIdService = async (id) => {
  const rol = await obtenerRolPorId(id);
  if (!rol) {
    throw new Error('Rol no encontrado');
  }
  return rol;
};

export const crearRolService = async (datosRol) => {
  if (!datosRol.nombre_rol) {
    throw new Error('El nombre del rol es obligatorio');
  }
  return await crearRol(datosRol);
};

export const actualizarRolService = async (id, datosRol) => {
  const existe = await obtenerRolPorId(id);
  if (!existe) {
    throw new Error('El rol a actualizar no existe');
  }
  
  const actualizado = await actualizarRol(id, datosRol);
  if (!actualizado) {
    throw new Error('No se pudo actualizar el rol');
  }
  
  return { id_rol: id, ...datosRol };
};

export const eliminarRolService = async (id) => {
  const existe = await obtenerRolPorId(id);
  if (!existe) {
    throw new Error('El rol a eliminar no existe');
  }

  const eliminado = await eliminarRol(id);
  if (!eliminado) {
    throw new Error('No se pudo eliminar el rol');
  }

  return true;
};