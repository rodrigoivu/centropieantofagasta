'use strict'

var express = require('express');
var AnamnesisController = require ('../controllers/anamnesis');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-anamnesis', AnamnesisController.saveAnamnesis);
 api.put('/update-anamnesis/:id', AnamnesisController.updateAnamnesis);
 api.get('/anamnesis-paciente/:id', AnamnesisController.pacienteAnamnesis);
 api.get('/lista-fichas-anamnesis', AnamnesisController.listaFichas);
 
 
module.exports = api;