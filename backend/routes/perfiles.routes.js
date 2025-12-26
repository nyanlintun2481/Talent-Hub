const express = require('express');
const router = express.Router();
const controller = require('../controllers/perfilController');
const auth = require('../middleware/auth');

router.get('/', controller.obtenerPerfiles);
router.post('/', auth, controller.crearPerfil);
router.put('/:id', auth, controller.actualizarPerfil);
router.delete('/:id', auth, controller.eliminarPerfil);

module.exports = router;
