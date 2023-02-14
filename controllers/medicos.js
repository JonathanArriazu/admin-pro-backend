const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medico = await Medico.find() 
                               .populate('usuario', 'nombre email')   
                               .populate('hospital', 'nombre email')                                   

    res.json({
        ok: true,
        medico
    })

}
const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }    

}
const actualizarMedico = async (req, res = response) => {

    const medicoId = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById( medicoId);

        if (!medico) {
            console.log(error);
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
        })
        }

        /* hospital.nombre = req.body.nombre; */
        //Pero, si tenemos muchos cambios por realizar, es mejor hacerlo asi:
        const cambiosMedico = {
            ...req.body,
            usuario: uid //Con esto obtengo el id de la ultima persona que hace una modificacion
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( medicoId, cambiosMedico, { new: true})

        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })        
    } 
}
const borrarMedico = async (req, res = response) => {

    const medicoId = req.params.id;

    try {

        const medico = await Medico.findById( medicoId );

        if (!medico) {
            console.log(error);
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
        })
        }

        await Medico.findByIdAndDelete( medicoId );

        res.json({
            ok: true,
            msg: 'Medico eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}