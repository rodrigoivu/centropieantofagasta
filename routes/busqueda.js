'use strict'

var express = require('express');
var BusquedaController = require ('../controllers/busqueda');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/busqueda/todo/:busqueda',[md_auth.ensureAuth,md_auth.ensureAdmin], BusquedaController.findAll);
api.get('/busqueda/:coleccion/:busqueda',[md_auth.ensureAuth], BusquedaController.findCollection); 
module.exports = api;