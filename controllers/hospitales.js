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
const actualizarHospital = async (req, res = response) => {

    const hospitalId = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( hospitalId);

        if (!hospital) {
            console.log(error);
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
        })
        }

        /* hospital.nombre = req.body.nombre; */
        //Pero, si tenemos muchos cambios por realizar, es mejor hacerlo asi:
        const cambiosHospital = {
            ...req.body,
            usuario: uid //Con esto obtengo el id de la ultima persona que hace una modificacion
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalId, cambiosHospital, { new: true})

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    }   
}
const borrarHospital = async (req, res = response) => {
    const hospitalId = req.params.id;

    try {

        const hospital = await Hospital.findById( hospitalId);

        if (!hospital) {
            console.log(error);
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
        })
        }        

        await Hospital.findByIdAndDelete(hospitalId)

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    }   
}
module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}