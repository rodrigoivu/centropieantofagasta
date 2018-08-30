'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var medicaGeneral = new Schema({
	historial : String,
	tartamiento: String,
	diagnosticos: String,
	medicamentos: String
},{ _id : false });

var GeneralSchema = new Schema({

	paciente: { type: Schema.Types.ObjectId,ref:'Paciente',required: [true,'El paciente es necesario']},
	user: { type: Schema.Types.ObjectId,ref:'User',unique: false ,required: [true,'El profesional es necesario']},
	fecha: { type: String, required: [true,'La fecha es necesario']},
	medicaGeneral: medicaGeneral
	
	
},{ collection: 'general'}); // esto es para evitar que se grave como 

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('General', GeneralSchema);