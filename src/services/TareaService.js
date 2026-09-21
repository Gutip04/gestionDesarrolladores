import {
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from '../models/TareaModel.js';
import { obtenerUsuarioPorId } from '../models/UsuarioModel.js';
import { obtenerEquipoPorId } from '../models/EquipoModel.js';

export const listarTareasService = async () => {
  return await obtenerTodasLasTareas();
};

export const obtenerTareaPorIdService = async (id) => {
  const tarea = await obtenerTareaPorId(id);
  if (!tarea) {
    throw new Error('Tarea no encontrada');
  }
  return tarea;
};

export const crearTareaService = async (datosTarea) => {
  const { titulo, id_usuario_asignado, id_equipo } = datosTarea;

  if (!titulo) {
    throw new Error('El título de la tarea es obligatorio');
  }

  if (id_usuario_asignado) {
    const usuarioExiste = await obtenerUsuarioPorId(id_usuario_asignado);
    if (!usuarioExiste) {
      throw new Error('El usuario asignado no existe');
    }
  }

  if (id_equipo) {
    const equipoExiste = await obtenerEquipoPorId(id_equipo);
    if (!equipoExiste) {
      throw new Error('El equipo asignado no existe');
    }
  }

  return await crearTarea(datosTarea);
};

export const actualizarTareaService = async (id, datosTarea) => {
  const tareaExistente = await obtenerTareaPorId(id);
  if (!tareaExistente) {
    throw new Error('La tarea a actualizar no existe');
  }

  const { id_usuario, id_equipo } = datosTarea;

  if (id_usuario) {
    const usuarioExiste = await obtenerUsuarioPorId(id_usuario);
    if (!usuarioExiste) {
      throw new Error('El usuario asignado no existe');
    }
  }

  if (id_equipo) {
    const equipoExiste = await obtenerEquipoPorId(id_equipo);
    if (!equipoExiste) {
      throw new Error('El equipo asignado no existe');
    }
  }

  const actualizado = await actualizarTarea(id, datosTarea);
  if (!actualizado) {
    throw new Error('No se pudo actualizar la tarea');
  }

  return { id_tarea: id, ...datosTarea };
};

export const eliminarTareaService = async (id) => {
  const tareaExistente = await obtenerTareaPorId(id);
  if (!tareaExistente) {
    throw new Error('La tarea a eliminar no existe');
  }

  const eliminado = await eliminarTarea(id);
  if (!eliminado) {
    throw new Error('No se pudo eliminar la tarea');
  }

  return true;
};