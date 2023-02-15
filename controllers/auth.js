const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async(req, res = response) => {
    
    try {
        
        const { email, name, picture } = await googleVerify( req.body.token);

        //Verificamos si es que el email existe entre los usuarios
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        //Si usuarioDB no existe, lo tengo que crear:
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@', //El password no lo usamos para nada pero lo dejamos asi
                                 // para que no choque con nada, ya que es requerido
                img: picture,
                google: true
            })
        } else { //Si el usuario ya existe:
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardamos al usuario en la base de datos:
        await usuario.save()

        //Aqui tengo usuario y contraseña validas, ahora tendria que generar un JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: 'Token de google no es correcto'
        });
    }
    

}


module.exports= {
    login,
    googleSignIn
}