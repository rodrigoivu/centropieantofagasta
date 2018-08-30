'use strict'

var express = require('express');
var ProfesionalController = require ('../controllers/profesional');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/users'});

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-profesional', ProfesionalController.saveProfesional);
 api.put('/update-profesional/:id', ProfesionalController.updateProfesional);
 api.get('/profesionales', ProfesionalController.listProfesionales);
 api.delete('/remove-profesional/:id', ProfesionalController.deleteProfesional);
 api.get('/profesional/:id', ProfesionalController.buscaProfesional);
 

 
module.exports = api;