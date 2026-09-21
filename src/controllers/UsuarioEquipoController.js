import {
  listarAsignacionesService,
  listarEquiposPorUsuarioService,
  asignarUsuarioAEquipoService,
  eliminarAsignacionService
} from '../services/UsuarioEquipoService.js';

export const getAsignaciones = async (req, res) => {
  try {
    const asignaciones = await listarAsignacionesService();
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const getEquiposByUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const equipos = await listarEquiposPorUsuarioService(idUsuario);
    res.json(equipos);
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const createAsignacion = async (req, res) => {
  try {
    const nuevaAsignacion = await asignarUsuarioAEquipoService(req.body);
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    const statusCode = error.message.includes('obligatorios') || error.message.includes('ya se encuentra') ? 400 : 
                       error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};

export const deleteAsignacion = async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarAsignacionService(id);
    res.json({ mensaje: 'Asignación eliminada correctamente' });
  } catch (error) {
    const statusCode = error.message.includes('no existe') ? 404 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};