import bcrypt from 'bcryptjs'; "bcryptjs"
import {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorEmail,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../models/UsuarioModel.js';

export const listarUsuariosService = async () => {
  return await obtenerTodosLosUsuarios();
};

export const obtenerUsuarioPorIdService = async (id) => {
  const usuario = await obtenerUsuarioPorId(id);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  return usuario;
};

export const crearUsuarioService = async (datosUsuario) => {
  const { nombre, apellido, email, password, id_rol } = datosUsuario;

  if (!nombre || !apellido || !email || !password || !id_rol) {
    throw new Error('Todos los campos son obligatorios');
  }

  const existeEmail = await obtenerUsuarioPorEmail(email);
  if (existeEmail) {
    throw new Error('El correo electrónico ya está registrado');
  }

  // 🔒 Hashear la contraseña con salt 10
  const salt = await bcrypt.genSalt(10);
  const passwordHasheada = await bcrypt.hash(password, salt);

  return await crearUsuario({
    ...datosUsuario,
    password: passwordHasheada
  });
};

export const actualizarUsuarioService = async (id, datosUsuario) => {
  const existe = await obtenerUsuarioPorId(id);
  if (!existe) {
    throw new Error('El usuario a actualizar no existe');
  }

  const actualizado = await actualizarUsuario(id, datosUsuario);
  if (!actualizado) {
    throw new Error('No se pudo actualizar el usuario');
  }

  return { id_usuario: id, ...datosUsuario };
};

export const eliminarUsuarioService = async (id) => {
  const existe = await obtenerUsuarioPorId(id);
  if (!existe) {
    throw new Error('El usuario a eliminar no existe');
  }

  const eliminado = await eliminarUsuario(id);
  if (!eliminado) {
    throw new Error('No se pudo eliminar el usuario');
  }

  return true;
};