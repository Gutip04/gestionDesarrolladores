import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { obtenerUsuarioPorEmail } from '../models/UsuarioModel.js';

export const loginService = async (email, password) => {
  const usuario = await obtenerUsuarioPorEmail(email);
  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

  // Comparar la contraseña en texto plano contra el hash de la BD
  const esPasswordValida = await bcrypt.compare(password, usuario.password);
  if (!esPasswordValida) {
    throw new Error('Credenciales inválidas');
  }

  // Firmar el JWT incluyendo el id_rol y el id_usuario
  const token = jwt.sign(
    { 
      id_usuario: usuario.id_usuario, 
      id_rol: usuario.id_rol 
    },
    process.env.JWT_SECRET || 'secreto_super_seguro_jwt',
    { expiresIn: '8h' }
  );

  return {
    usuario: {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      id_rol: usuario.id_rol
    },
    token
  };
};