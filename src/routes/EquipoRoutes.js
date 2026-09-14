import { Router } from 'express';
import {
  getEquipos,
  getEquipoById,
  createEquipo,
  updateEquipo,
  deleteEquipo
} from '../controllers/EquipoController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, getEquipos);
router.get('/:id', verificarToken, getEquipoById);
router.post('/', [verificarToken, esAdmin], createEquipo);
router.put('/:id', [verificarToken, esAdmin], updateEquipo);
router.delete('/:id', [verificarToken, esAdmin], deleteEquipo);

export default router;