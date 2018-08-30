'use strict'

var express = require('express');
var PesquisaController = require ('../controllers/pesquisa');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

 var multipart = require('connect-multiparty');
 var md_upload = multipart({ uploadDir: './uploads/pacientes/xls'});

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-pesquisa', PesquisaController.crearPesquisa);
 api.put('/update-pesquisa/:id', PesquisaController.updatePesquisa);
 api.get('/pesquisa/:id', PesquisaController.buscaPesquisa);
 api.get('/pesquisas', PesquisaController.listPesquisas);
 api.put('/upload-xls-pesquisa/:id/:usuario',[md_auth.ensureAuth, md_upload],PesquisaController.uploadFileXls);
 api.get('/get-xls-pesquisa/:file',PesquisaController.getFileXls);

 
module.exports = api;