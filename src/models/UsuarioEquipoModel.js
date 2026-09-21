import { pool } from '../db/database.js';

// Obtener todas las asignaciones con los detalles del usuario y del equipo
export const obtenerTodasLasAsignaciones = async () => {
  const [filas] = await pool.query(`
    SELECT 
      ue.id_usuario_equipo,
      ue.id_usuario,
      u.nombre AS nombre_usuario,
      u.apellido AS apellido_usuario,
      u.email,
      ue.id_equipo,
      e.nombre_equipo,
      ue.fecha_asignacion
    FROM usuario_equipo ue
    INNER JOIN usuarios u ON ue.id_usuario = u.id_usuario
    INNER JOIN equipos e ON ue.id_equipo = e.id_equipo
  `);
  return filas;
};

// Obtener los equipos asociados a un usuario específico
export const obtenerEquiposPorUsuario = async (idUsuario) => {
  const [filas] = await pool.query(`
    SELECT 
      ue.id_usuario_equipo,
      e.id_equipo,
      e.nombre_equipo,
      e.descripcion,
      ue.fecha_asignacion
    FROM usuario_equipo ue
    INNER JOIN equipos e ON ue.id_equipo = e.id_equipo
    WHERE ue.id_usuario = ?
  `, [idUsuario]);
  return filas;
};

// Verificar si un usuario ya pertenece a un equipo
export const verificarAsignacionExistente = async (id_usuario, id_equipo) => {
  const [filas] = await pool.query(
    'SELECT * FROM usuario_equipo WHERE id_usuario = ? AND id_equipo = ?',
    [id_usuario, id_equipo]
  );
  return filas[0];
};

// Asignar un usuario a un equipo
export const asignarUsuarioAEquipo = async ({ id_usuario, id_equipo }) => {
  const [resultado] = await pool.query(
    'INSERT INTO usuario_equipo (id_usuario, id_equipo) VALUES (?, ?)',
    [id_usuario, id_equipo]
  );
  return {
    id_usuario_equipo: resultado.insertId,
    id_usuario,
    id_equipo
  };
};

// Eliminar una asignación específica por su ID
export const eliminarAsignacion = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM usuario_equipo WHERE id_usuario_equipo = ?',
    [id]
  );
  return resultado.affectedRows > 0;
};