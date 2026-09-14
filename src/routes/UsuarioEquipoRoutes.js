import { Router } from 'express';
import {
  getAsignaciones,
  getEquiposByUsuario,
  createAsignacion,
  deleteAsignacion
} from '../controllers/UsuarioEquipoController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

//  Consulta: Cualquier usuario autenticado puede ver las asignaciones
router.get('/', verificarToken, getAsignaciones);
router.get('/usuario/:idUsuario', verificarToken, getEquiposByUsuario);

//  Gestión: Solo el Administrador (id_rol = 1) puede asignar o eliminar usuarios de un equipo
router.post('/', [verificarToken, esAdmin], createAsignacion);
router.delete('/:id', [verificarToken, esAdmin], deleteAsignacion);

export default router;