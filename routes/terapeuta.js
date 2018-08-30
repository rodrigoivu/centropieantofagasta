'use strict'

var express = require('express');
var TerapeutaController = require ('../controllers/terapeuta');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-terapeuta', TerapeutaController.saveTerapeuta);
 api.put('/update-terapeuta/:id/:fecha', TerapeutaController.updateTerapeuta);
 api.get('/terapeuta-paciente/:id', TerapeutaController.pacienteTerapeuta);
 api.get('/lista-fichas-terapeuta', TerapeutaController.listaFichas);
 
 
module.exports = api;