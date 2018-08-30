'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var  actividadesVidaDiaria = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number,
  actividad6: Number,
  actividad7: Number,
  actividad8: Number,
  actividad9: Number,
  actividad10: Number,
  actividad11: Number,
  actividad12: Number,
  actividad13: Number,
  actividad14: Number,
  actividad15: Number,
  actividad16: Number,
  actividad17: Number,
  actividad18: Number
  
},{ _id : false });
var  actividadesInstrumentales = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number,
  actividad6: Number,
  actividad7: Number,
  actividad8: Number,
  actividad9: Number,
  actividad10: Number,
  actividad11: Number,
  actividad12: Number,
  actividad13: Number,
  actividad14: Number
  
},{ _id : false });
var  descansoSueno = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number
  
},{ _id : false });
var  educacion = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number,
  actividad6: Number,
  actividad7: Number,
  actividad8: Number
  
},{ _id : false });
var  ocio = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number
  
},{ _id : false });
var  juego = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number,
  actividad6: Number,
  actividad7: Number,
  actividad8: Number,
  actividad9: Number,
  actividad10: Number,
  actividad11: Number,
  actividad12: Number,
  actividad13: Number,
  actividad14: Number,
  actividad15: Number,
  actividad16: Number,
  actividad17: Number,
  actividad18: Number,
  actividad19: Number,
  actividad20: Number,
  actividad21: Number,
  actividad22: Number,
  actividad23: Number,
  actividad24: Number,
  actividad25: Number,
  actividad26: Number,
  actividad27: Number,
  actividad28: Number,
  actividad29: Number,
  actividad30: Number,
  actividad31: Number,
  actividad32: Number,
  actividad33: Number,
  actividad34: Number,
  actividad35: Number,
  actividad36: Number
  
},{ _id : false });
var  participacionSocial = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number,
  actividad6: Number,
  actividad7: Number,
  actividad8: Number,
  actividad9: Number,
  actividad10: Number,
  actividad11: Number,
  actividad12: Number,
  actividad13: Number,
  actividad14: Number,
  actividad15: Number,
  actividad16: Number,
  actividad17: Number,
  actividad18: Number,
  actividad19: Number,
  actividad20: Number,
  actividad21: Number,
  actividad22: Number
  
},{ _id : false });
var  transversal = new Schema({
  actividad1: Number,
  actividad2: Number,
  actividad3: Number,
  actividad4: Number,
  actividad5: Number
  
},{ _id : false });

var TerapeutaSchema = new Schema({

	paciente: { type: Schema.Types.ObjectId,ref:'Paciente',required: [true,'El paciente es necesario']},
	user: { type: Schema.Types.ObjectId,ref:'User',unique: false ,required: [true,'El profesional es necesario']},
	fecha: { type: String, required: [true,'La fecha es necesaria']},
	actividadesVidaDiaria: actividadesVidaDiaria,
	actividadesInstrumentales: actividadesInstrumentales,
	descansoSueno: descansoSueno,
	educacion: educacion,
	ocio: ocio,
	juego: juego,
	participacionSocial: participacionSocial,
	transversal: transversal
	
	
},{ collection: 'terapeuta'}); // esto es para evitar que se grave como 

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Terapeuta', TerapeutaSchema);