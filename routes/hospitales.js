/* 
ruta: '/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();
//No es necesario que en el get coloque la ruta, ya que se que si se ingresa aqui es porque viene desde api/hospitales
router.get( '/',getHospitales);

router.post(     //ruta esta formada por el ('path', midelware o [midelware], controlador)
    '/',
    [
    ], 
    crearHospital
);

router.put( '/:id',
    [
    ],
    actualizarHospital
);

router.delete( '/:id',
    borrarHospital
);

module.exports = router;