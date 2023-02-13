//import express from 'express'
const express = require('express');
const {dbConecction} = require('./database/config')
require('dotenv').config();
var cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use(cors())

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConecction();

//Rutas: app.get(), app.put(), app.delete(), app.post()
app.use('/api/usuarios', require('./routes/usuarios')); //Con esto, cualquier peticion que venga desde api/usuarios, va a ser respondida por el routes/usuarios
app.use('/api/login', require('./routes/auth'));



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + 3000);
} )