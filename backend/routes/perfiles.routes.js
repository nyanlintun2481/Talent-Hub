import { Router } from 'express';
import * as controller from '../controllers/perfilController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', controller.obtenerPerfiles);
router.post('/', auth, controller.crearPerfil);
router.put('/:id', auth, controller.actualizarPerfil);
router.delete('/:id', auth, controller.eliminarPerfil);

export default router;
