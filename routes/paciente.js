'use strict'

var express = require('express');
var PacienteController = require ('../controllers/paciente');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

 var multipart = require('connect-multiparty');
 var md_upload = multipart({ uploadDir: './uploads/pacientes/pdf'});

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-paciente', PacienteController.savePaciente);
 api.put('/update-paciente/:id', PacienteController.updatePaciente);
 api.get('/pacientes', PacienteController.listPacientes);
 // api.delete('/remove-paciente/:id', PacienteController.deleteProfesional);
 api.put('/upload-pdf-paciente/:id/:titulo/:profesionalProfesion',[md_auth.ensureAuth, md_upload],PacienteController.uploadFilePdf);
 api.get('/get-pdf-paciente/:file',PacienteController.getFilePdf);
 api.get('/get-doc-paciente/:file',PacienteController.getFileDoc);
 api.get('/paciente/:id', PacienteController.buscaPaciente);

 
module.exports = api;