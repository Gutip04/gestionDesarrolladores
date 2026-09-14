import {
  listarEquiposService,
  obtenerEquipoPorIdService,
  crearEquipoService,
  actualizarEquipoService,
  eliminarEquipoService
} from '../services/EquipoService.js';

export const getEquipos = async (req, res) => {
  try {
    const equipos = await listarEquiposService();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const getEquipoById = async (req, res) => {
  const { id } = req.params;
  try {
    const equipo = await obtenerEquipoPorIdService(id);
    res.json(equipo);
  } catch (error) {
    const statusCode = error.message === 'Equipo no encontrado' ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const createEquipo = async (req, res) => {
  try {
    const nuevoEquipo = await crearEquipoService(req.body);
    res.status(201).json(nuevoEquipo);
  } catch (error) {
    const statusCode = error.message.includes('obligatorio') ? 400 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const updateEquipo = async (req, res) => {
  const { id } = req.params;
  try {
    const equipoActualizado = await actualizarEquipoService(id, req.body);
    res.json(equipoActualizado);
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const deleteEquipo = async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarEquipoService(id);
    res.json({ mensaje: 'Equipo eliminado correctamente' });
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};