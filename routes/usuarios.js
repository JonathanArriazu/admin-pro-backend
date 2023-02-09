const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios')

const router = Router();
//No es necesario que en el get coloque la ruta, ya que se que si se ingresa aqui es porque viene desde api/usuarios
router.get( '/', getUsuarios);
router.post('/', crearUsuario);

module.exports = router;