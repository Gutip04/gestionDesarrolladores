import { Router } from 'express';
import {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea
} from '../controllers/TareaController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Todos los usuarios autenticados pueden ver tareas
router.get('/', verificarToken, getTareas);
router.get('/:id', verificarToken, getTareaById);

//  Solo el Administrador (id_rol = 1) puede crear, modificar y eliminar
router.post('/', [verificarToken, esAdmin], createTarea);
router.put('/:id', [verificarToken, esAdmin], updateTarea);
router.delete('/:id', [verificarToken, esAdmin], deleteTarea);

export default router;