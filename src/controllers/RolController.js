import {
  listarRolesService,
  obtenerRolPorIdService,
  crearRolService,
  actualizarRolService,
  eliminarRolService
} from '../services/RolService.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await listarRolesService();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const getRolById = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await obtenerRolPorIdService(id);
    res.json(rol);
  } catch (error) {
    const statusCode = error.message === 'Rol no encontrado' ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const createRol = async (req, res) => {
  try {
    const nuevoRol = await crearRolService(req.body);
    res.status(201).json(nuevoRol);
  } catch (error) {
    const statusCode = error.message.includes('obligatorio') ? 400 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const updateRol = async (req, res) => {
  const { id } = req.params;
  try {
    const rolActualizado = await actualizarRolService(id, req.body);
    res.json(rolActualizado);
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const deleteRol = async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarRolService(id);
    res.json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};