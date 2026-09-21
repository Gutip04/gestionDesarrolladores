import {pool} from '../db/database.js';


// Obtener todos los roles
export const obtenerTodosLosRoles = async () => {
  const [filas] = await pool.query('SELECT * FROM roles');
  return filas;
};

// Obtener un rol por su ID
export const obtenerRolPorId = async (id) => {
  const [filas] = await pool.query(
    'SELECT * FROM roles WHERE id_rol = ?',
    [id]
  );
  return filas[0];
};

// Crear un nuevo rol
export const crearRol = async ({ nombre_rol, descripcion }) => {
  const [resultado] = await pool.query(
    'INSERT INTO roles (nombre_rol, descripcion) VALUES (?, ?)',
    [nombre_rol, descripcion]
  );
  return {
    id_rol: resultado.insertId,
    nombre_rol,
    descripcion
  };
};

// Actualizar un rol existente
export const actualizarRol = async (id, { nombre_rol, descripcion }) => {
  const [resultado] = await pool.query(
    'UPDATE roles SET nombre_rol = ?, descripcion = ? WHERE id_rol = ?',
    [nombre_rol, descripcion, id]
  );
  return resultado.affectedRows > 0;
};

// Eliminar un rol
export const eliminarRol = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM roles WHERE id_rol = ?',
    [id]
  );
  return resultado.affectedRows > 0;
};