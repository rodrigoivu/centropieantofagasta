'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var establecerVinculo = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number
  
},{ _id : false });
var capacidadesAdaptativas = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number
  
},{ _id : false });
var  autoconcepto = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number,
  actividad6: Number,
  actividad7: Number,
  actividad8: Number
},{ _id : false });
var labilidadEmocional = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number
  
},{ _id : false });


var PsicologiaSchema = new Schema({

	paciente: { type: Schema.Types.ObjectId,ref:'Paciente',required: [true,'El paciente es necesario']},
	user: { type: Schema.Types.ObjectId,ref:'User',unique: false ,required: [true,'El profesional es necesario']},
	fecha: { type: String, required: [true,'La fecha es necesaria']},
	establecerVinculo: establecerVinculo,
	capacidadesAdaptativas: capacidadesAdaptativas,
	autoconcepto: autoconcepto,
	labilidadEmocional: labilidadEmocional,
  observaciones:{ type: String, required: false}

	
	
},{ collection: 'psicologia'}); // esto es para evitar que se grave como 

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Psicologia', PsicologiaSchema);