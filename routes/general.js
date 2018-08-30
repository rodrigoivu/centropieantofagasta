'use strict'

var express = require('express');
var GeneralController = require ('../controllers/general');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-general', GeneralController.saveGeneral);
 api.put('/update-general/:id/:fecha', GeneralController.updateGeneral);
 api.get('/general-paciente/:id', GeneralController.pacienteGeneral);
 api.get('/lista-fichas-general', GeneralController.listaFichas);
 
 
module.exports = api;