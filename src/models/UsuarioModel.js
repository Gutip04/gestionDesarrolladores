import {pool} from '../db/database.js';

export const obtenerTodosLosUsuarios = async () => {
  const [filas] = await pool.query(`
    SELECT u.id_usuario, u.nombre, u.apellido, u.email, u.fecha_registro, u.activo, r.id_rol, r.nombre_rol 
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
  `);
  return filas;
};

export const obtenerUsuarioPorId = async (id) => {
  const [filas] = await pool.query(`
    SELECT u.id_usuario, u.nombre, u.apellido, u.email, u.fecha_registro, u.activo, r.id_rol, r.nombre_rol 
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.id_usuario = ?
  `, [id]);
  return filas[0];
};

export const obtenerUsuarioPorEmail = async (email) => {
  const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return filas[0];
};

export const crearUsuario = async ({ nombre, apellido, email, password, id_rol }) => {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, email, password, id_rol) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, email, password, id_rol]
  );
  return {
    id_usuario: resultado.insertId,
    nombre,
    apellido,
    email,
    id_rol
  };
};

export const actualizarUsuario = async (id, { nombre, apellido, email, id_rol, activo }) => {
  const [resultado] = await pool.query(
    'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, id_rol = ?, activo = ? WHERE id_usuario = ?',
    [nombre, apellido, email, id_rol, activo, id]
  );
  return resultado.affectedRows > 0;
};

export const eliminarUsuario = async (id) => {
  const [resultado] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  return resultado.affectedRows > 0;
};