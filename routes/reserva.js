'use strict'

var express = require('express');
var ReservaController = require ('../controllers/reserva');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/users'});

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-reserva', ReservaController.saveReserva);
 // api.put('/update-paciente/:id', PacienteController.updateProfesional);
 api.get('/reservas', ReservaController.listReservas);
 api.get('/reservasporfechausuario/:id_user', ReservaController.listReservasPorFechaUsuario); //Fecha y repite dia se envian por query no por params
 api.delete('/remove-reserva/:id', ReservaController.deleteReserva);

 
module.exports = api;