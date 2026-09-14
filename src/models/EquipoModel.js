import { pool } from '../db/database.js';

export const obtenerTodosLosEquipos = async () => {
  const [filas] = await pool.query('SELECT * FROM equipos');
  return filas;
};

export const obtenerEquipoPorId = async (id) => {
  const [filas] = await pool.query(
    'SELECT * FROM equipos WHERE id_equipo = ?',
    [id]
  );
  return filas[0];
};

export const crearEquipo = async ({ nombre_equipo, descripcion }) => {
  const [resultado] = await pool.query(
    'INSERT INTO equipos (nombre_equipo, descripcion) VALUES (?, ?)',
    [nombre_equipo, descripcion]
  );
  return {
    id_equipo: resultado.insertId,
    nombre_equipo,
    descripcion
  };
};

export const actualizarEquipo = async (id, { nombre_equipo, descripcion }) => {
  const [resultado] = await pool.query(
    'UPDATE equipos SET nombre_equipo = ?, descripcion = ? WHERE id_equipo = ?',
    [nombre_equipo, descripcion, id]
  );
  return resultado.affectedRows > 0;
};

export const eliminarEquipo = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM equipos WHERE id_equipo = ?',
    [id]
  );
  return resultado.affectedRows > 0;
};