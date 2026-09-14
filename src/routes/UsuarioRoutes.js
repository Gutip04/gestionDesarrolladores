import { Router } from 'express';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../controllers/UsuarioController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, getUsuarios);
router.get('/:id', verificarToken, getUsuarioById);
router.post('/', [verificarToken, esAdmin], createUsuario);
router.put('/:id', [verificarToken, esAdmin], updateUsuario);
router.delete('/:id', [verificarToken, esAdmin], deleteUsuario);

export default router;