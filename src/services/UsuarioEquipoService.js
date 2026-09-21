import {
  obtenerTodasLasAsignaciones,
  obtenerEquiposPorUsuario,
  verificarAsignacionExistente,
  asignarUsuarioAEquipo,
  eliminarAsignacion
} from '../models/UsuarioEquipoModel.js';
import { obtenerUsuarioPorId } from '../models/UsuarioModel.js';
import { obtenerEquipoPorId } from '../models/EquipoModel.js';

export const listarAsignacionesService = async () => {
  return await obtenerTodasLasAsignaciones();
};

export const listarEquiposPorUsuarioService = async (idUsuario) => {
  const usuario = await obtenerUsuarioPorId(idUsuario);
  if (!usuario) {
    throw new Error('El usuario especificado no existe');
  }
  return await obtenerEquiposPorUsuario(idUsuario);
};

export const asignarUsuarioAEquipoService = async (datos) => {
  const { id_usuario, id_equipo } = datos;

  if (!id_usuario || !id_equipo) {
    throw new Error('Los campos id_usuario e id_equipo son obligatorios');
  }

  // Validar existencia de Usuario y Equipo
  const usuario = await obtenerUsuarioPorId(id_usuario);
  if (!usuario) {
    throw new Error('El usuario ingresado no existe');
  }

  const equipo = await obtenerEquipoPorId(id_equipo);
  if (!equipo) {
    throw new Error('El equipo ingresado no existe');
  }

  // Evitar duplicados
  const yaAsignado = await verificarAsignacionExistente(id_usuario, id_equipo);
  if (yaAsignado) {
    throw new Error('El usuario ya se encuentra asignado a este equipo');
  }

  return await asignarUsuarioAEquipo(datos);
};

export const eliminarAsignacionService = async (id) => {
  const eliminado = await eliminarAsignacion(id);
  if (!eliminado) {
    throw new Error('La asignación especificada no existe');
  }
  return true;
};