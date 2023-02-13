/* 
path: '/api/usuarios'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')

const router = Router();
//No es necesario que en el get coloque la ruta, ya que se que si se ingresa aqui es porque viene desde api/usuarios
router.get( '/', getUsuarios);

router.post(     //ruta esta formada por el ('path', midelware o [midelware], controlador)
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearUsuario
);

router.put( '/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').isEmail(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete( '/:id',
    borrarUsuario
);

module.exports = router;