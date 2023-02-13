const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Primero verificamos si existe usuario con el mail que estoy ingresando
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg:'Email no encontrado'
            })
        }

        //Si llega a este punto, existe usuario con ese email, entonces tenemos
        // que verificar la contraseña:
        const validPassword = bcrypt.compareSync( password, usuarioDB.password)
        //Con esto de arriba, comparamos la contraseña ingresada con la que tiene el usuarioDB
        //lo cual regresa un true si coinciden
        if ( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Aqui tengo usuario y contraseña validas, ahora tendria que generar un JWT

        res.json({
            ok: true,
            usuarioDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports= {
    login
}