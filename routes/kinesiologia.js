'use strict'

var express = require('express');
var KinesiologiaController = require ('../controllers/kinesiologia');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-kinesiologia', KinesiologiaController.saveKinesiologia);
 api.put('/update-kinesiologia/:id/:fecha', KinesiologiaController.updateKinesiologia);
 api.get('/kinesiologia-paciente/:id', KinesiologiaController.pacienteKinesiologia);
 api.get('/lista-fichas-kinesiologia', KinesiologiaController.listaFichas);
 
 
module.exports = api;