const Usuario = require('../models/usuario');

const getUsuarios = (req, res) => {
    res.status(400).json({
        ok: true,
        usuarios: 'get Usuarios'
    })
};

const crearUsuario = async (req, res) => {

    const {email, password, nombre} = req.body;

    const usuario = new Usuario( req.body);

    await usuario.save();

    res.status(400).json({
        ok: true,
        usuario
    })
};

module.exports = {
    getUsuarios,
    crearUsuario
}