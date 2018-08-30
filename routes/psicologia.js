'use strict'

var express = require('express');
var PsicologiaController = require ('../controllers/psicologia');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-psicologia', PsicologiaController.savePsicologia);
 api.put('/update-psicologia/:id/:fecha', PsicologiaController.updatePsicologia);
 api.get('/psicologia-paciente/:id', PsicologiaController.pacientePsicologia);
 api.get('/lista-fichas-psicologia', PsicologiaController.listaFichas);
 
 
module.exports = api;