//import express from 'express'
const express = require('express');
const {dbConecction} = require('./database/config')
require('dotenv').config();
var cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use(cors())

//Base de datos
dbConecction();

//Rutas: app.get(), app.put(), app.delete(), app.post()
app.get( '/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola mundo!'
    })
} );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + 3000);
} )