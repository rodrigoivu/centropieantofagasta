'use strict'

var express = require('express');
var BloqueoController = require ('../controllers/bloqueo');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/users'});

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-bloqueo', BloqueoController.saveBloqueo);
 // api.put('/update-paciente/:id', PacienteController.updateProfesional);
 api.get('/bloqueos', BloqueoController.listBloqueos);
 api.delete('/remove-bloqueo/:id', BloqueoController.deleteBloqueo);

 
module.exports = api;