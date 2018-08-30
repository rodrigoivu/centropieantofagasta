'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var PacienteSchema = new Schema({

    rut: { type: String, unique: true,required: [true,'El rut del paciente es necesario'] },
	name: { type: String, required: [true,'El nombre es necesario']},
	fechaNacimiento: { type: String, required: false },
	establecimiento: { type: String, required: false },
	nivel: { type: String, required: false },
	direccion: { type: String, required: false },
	fijo: { type: String, required: false },
	celular: { type: String, required: false },
	email: { type: String, required: false },
	autorizacionSalida: { type: String, required: false },
	autorizacionTransporte: { type: String, required: false },
	protocoloAdir: { type: String, required: false },
	protocoloAdos: { type: String, required: false },
	protocoloEvaluacion1: { type: String, required: false },
	protocoloEvaluacion2: { type: String, required: false },
	protocoloEvaluacion3: { type: String, required: false },
	protocoloEvaluacion4: { type: String, required: false },
	protocoloEvaluacion5: { type: String, required: false },
	protocoloInformeFinal: { type: String, required: false },
	protocolo1SubidoPor: { type: String, required: false },
	protocolo2SubidoPor: { type: String, required: false },
	protocolo3SubidoPor: { type: String, required: false },
	protocolo4SubidoPor: { type: String, required: false },
	protocolo5SubidoPor: { type: String, required: false },
	protocolo6SubidoPor: { type: String, required: false },
	protocolo7SubidoPor: { type: String, required: false },
	protocolo8SubidoPor: { type: String, required: false },
	protocolo9SubidoPor: { type: String, required: false },
	protocolo10SubidoPor: { type: String, required: false }

	// observaciones: { type: String, required: false }

});

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Paciente', PacienteSchema);