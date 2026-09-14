import {
  obtenerTodosLosEquipos,
  obtenerEquipoPorId,
  crearEquipo,
  actualizarEquipo,
  eliminarEquipo
} from '../models/EquipoModel.js';

export const listarEquiposService = async () => {
  return await obtenerTodosLosEquipos();
};

export const obtenerEquipoPorIdService = async (id) => {
  const equipo = await obtenerEquipoPorId(id);
  if (!equipo) {
    throw new Error('Equipo no encontrado');
  }
  return equipo;
};

export const crearEquipoService = async (datosEquipo) => {
  if (!datosEquipo.nombre_equipo) {
    throw new Error('El nombre del equipo es obligatorio');
  }
  return await crearEquipo(datosEquipo);
};

export const actualizarEquipoService = async (id, datosEquipo) => {
  const existe = await obtenerEquipoPorId(id);
  if (!existe) {
    throw new Error('El equipo a actualizar no existe');
  }

  const actualizado = await actualizarEquipo(id, datosEquipo);
  if (!actualizado) {
    throw new Error('No se pudo actualizar el equipo');
  }

  return { id_equipo: id, ...datosEquipo };
};

export const eliminarEquipoService = async (id) => {
  const existe = await obtenerEquipoPorId(id);
  if (!existe) {
    throw new Error('El equipo a eliminar no existe');
  }

  const eliminado = await eliminarEquipo(id);
  if (!eliminado) {
    throw new Error('No se pudo eliminar el equipo');
  }

  return true;
};