import {
  listarUsuariosService,
  obtenerUsuarioPorIdService,
  crearUsuarioService,
  actualizarUsuarioService,
  eliminarUsuarioService
} from '../services/UsuarioService.js';

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await listarUsuariosService();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await obtenerUsuarioPorIdService(id);
    res.json(usuario);
  } catch (error) {
    const statusCode = error.message === 'Usuario no encontrado' ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await crearUsuarioService(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    const statusCode = error.message.includes('obligatorios') || error.message.includes('registrado') ? 400 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioActualizado = await actualizarUsuarioService(id, req.body);
    res.json(usuarioActualizado);
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarUsuarioService(id);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};