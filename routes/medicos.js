/* 
ruta: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();
//No es necesario que en el get coloque la ruta, ya que se que si se ingresa aqui es porque viene desde api/hospitales
router.get( '/',getMedicos);

router.post(     //ruta esta formada por el ('path', midelware o [midelware], controlador)
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El ID del Hospital debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedico
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El ID del Hospital debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete( '/:id',
    validarJWT,
    borrarMedico
);

module.exports = router;