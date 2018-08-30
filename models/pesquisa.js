'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var PesquisaSchema = new Schema({

	periodo: { type: Number, unique: true,required: [true,'El periodo es necesario'] },
	pesquisaXls: { type: String, required: false},
	fecha: { type: String, required: false},
	subidoPor: { type: String, required: false}
	
},{ collection: 'pesquisa'}); // esto es para evitar que se grave como 

module.exports = mongoose.model('Pesquisa', PesquisaSchema);