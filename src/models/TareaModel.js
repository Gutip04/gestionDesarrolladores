import { pool } from '../db/database.js';

// Obtener todas las tareas con JOIN a usuarios y equipos
export const obtenerTodasLasTareas = async () => {
  const [filas] = await pool.query(`
    SELECT 
      t.id_tarea,
      t.titulo,
      t.descripcion,
      t.estado,
      t.prioridad,
      t.fecha_creacion,
      t.fecha_limite,
      t.id_usuario_asignado,
      u.nombre AS nombre_usuario,
      u.apellido AS apellido_usuario,
      t.id_equipo,
      e.nombre_equipo
    FROM tareas t
    LEFT JOIN usuarios u ON t.id_usuario_asignado = u.id_usuario
    LEFT JOIN equipos e ON t.id_equipo = e.id_equipo
  `);
  return filas;
};

// Obtener una tarea por su ID
export const obtenerTareaPorId = async (id) => {
  const [filas] = await pool.query(`
    SELECT 
      t.id_tarea,
      t.titulo,
      t.descripcion,
      t.estado,
      t.prioridad,
      t.fecha_creacion,
      t.fecha_limite,
      t.id_usuario_asignado,
      u.nombre AS nombre_usuario,
      u.apellido AS apellido_usuario,
      t.id_equipo,
      e.nombre_equipo
    FROM tareas t
    LEFT JOIN usuarios u ON t.id_usuario_asignado = u.id_usuario
    LEFT JOIN equipos e ON t.id_equipo = e.id_equipo
    WHERE t.id_tarea = ?
  `, [id]);
  return filas[0];
};

// Crear una nueva tarea
export const crearTarea = async ({ 
  titulo, 
  descripcion, 
  estado = 'pendiente', 
  prioridad = 'media', 
  fecha_limite, 
  id_usuario_asignado, 
  id_equipo 
}) => {
  const [resultado] = await pool.query(
    `INSERT INTO tareas (titulo, descripcion, estado, prioridad, fecha_limite, id_usuario_asignado, id_equipo) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      titulo, 
      descripcion, 
      estado, 
      prioridad, 
      fecha_limite || null, 
      id_usuario_asignado || null, 
      id_equipo || null
    ]
  );
  return {
    id_tarea: resultado.insertId,
    titulo,
    descripcion,
    estado,
    prioridad,
    fecha_limite,
    id_usuario_asignado,
    id_equipo
  };
};

// Actualizar una tarea existente
export const actualizarTarea = async (id, { 
  titulo, 
  descripcion, 
  estado, 
  prioridad, 
  fecha_limite, 
  id_usuario_asignado, 
  id_equipo 
}) => {
  const [resultado] = await pool.query(
    `UPDATE tareas 
     SET titulo = ?, descripcion = ?, estado = ?, prioridad = ?, fecha_limite = ?, id_usuario_asignado = ?, id_equipo = ? 
     WHERE id_tarea = ?`,
    [
      titulo, 
      descripcion, 
      estado, 
      prioridad, 
      fecha_limite || null, 
      id_usuario_asignado || null, 
      id_equipo || null, 
      id
    ]
  );
  return resultado.affectedRows > 0;
};

// Eliminar una tarea por su ID
export const eliminarTarea = async (id) => {
  const [resultado] = await pool.query('DELETE FROM tareas WHERE id_tarea = ?', [id]);
  return resultado.affectedRows > 0;
};