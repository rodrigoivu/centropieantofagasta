'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var NgbDate = new Schema({
  day: Number,
  month: Number,
  year: Number
},{ _id : false });

var BloqueoSchema = new Schema({

	dateDesde: { type: NgbDate, required: [true,'La fecha inicial es necesaria']},
	dateHasta: { type: NgbDate, required: [true,'La fecha final es necesaria'] },
	descripcion: { type: String, required: [true,'La descripción es necesaria'] }
	
});

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Bloqueo', BloqueoSchema);