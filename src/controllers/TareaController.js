import {
  listarTareasService,
  obtenerTareaPorIdService,
  crearTareaService,
  actualizarTareaService,
  eliminarTareaService
} from '../services/TareaService.js';

export const getTareas = async (req, res) => {
  try {
    const tareas = await listarTareasService();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const getTareaById = async (req, res) => {
  const { id } = req.params;
  try {
    const tarea = await obtenerTareaPorIdService(id);
    res.json(tarea);
  } catch (error) {
    const statusCode = error.message === 'Tarea no encontrada' ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const createTarea = async (req, res) => {
  try {
    const nuevaTarea = await crearTareaService(req.body);
    res.status(201).json(nuevaTarea);
  } catch (error) {
    const statusCode = error.message.includes('obligatorio') ? 400 :
                       error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const updateTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const tareaActualizada = await actualizarTareaService(id, req.body);
    res.json(tareaActualizada);
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const deleteTarea = async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarTareaService(id);
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};