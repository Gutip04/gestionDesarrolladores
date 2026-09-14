import { Router } from 'express';
import {
  getRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
} from '../controllers/RolController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

//  Consulta: Cualquier usuario autenticado puede ver los roles
router.get('/', verificarToken, getRoles);
router.get('/:id', verificarToken, getRolById);

//  Gestión: Solo el Administrador (id_rol = 1) puede crear, editar o eliminar roles
router.post('/', [verificarToken, esAdmin], createRol);
router.put('/:id', [verificarToken, esAdmin], updateRol);
router.delete('/:id', [verificarToken, esAdmin], deleteRol);

export default router;