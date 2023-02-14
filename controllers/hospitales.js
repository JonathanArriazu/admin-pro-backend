const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find() //Con esto traigo a todos los hospitales junto con el id de la persona que lo creo
                                     .populate('usuario', 'nombre email img')
                                    //Pero, me gustaria no solo saber el id de esa persona, tambien quiero saber su nombre, email, img
                                    //es por eso que uso .populate e ingreso esos datos dentro de la propiedad "usuario"
    res.json({
        ok: true,
        hospitales
    })

}
const crearHospital = async (req, res = response) => {

    //const hospital = new Hospital( req.body );
    const uid = req.uid;  //Tengo que enviar el uid del usuario que esta creando el hospital
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    })

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })

}
const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    })

}
module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}