'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// var NgbDate = new Schema({
//   day: Number,
//   month: Number,
//   year: Number
// },{ _id : false });

var antecedentesFamiliares = new Schema({
	nombreMadre : String,
 	edadMadre : Number,
  	escolaridadMadre : String,
  	ocupacionMadre : String,
  	horarioTrabajoMadre : String,
  	nombrePadre : String,
  	edadPadre : Number,
  	escolaridadPadre : String,
  	ocupacionPadre : String,
  	horarioTrabajoPadre : String,
  	descripcionFamiliar : String
},{ _id : false });
var antecedentesSalud = new Schema({
	tiempoGestion : String,
	tipoParto : String,
	motivoCesarea : String,
	pesoNacer : String,
	tallaNacer : String,
	apgar : String,
	enfermedadesPrePostNatal : String,
	cuales : String,
	observaciones : String
},{ _id : false });

var historialClinico = new Schema({
	enfermedadesFamiliares : String,
	neurologoPsiquiatra : Number,
	fonoaudiologo : Number,
	educadorPsicopedagogo : Number,
	terapeutaOcupacional : Number,
	kinesiologo : Number,
	psicologo : Number,
	biomedicina : Number,
	tutora : Number,
	otros : Number,
	otrosString : String,
	intervencionQuirurgicaHospitalizaciones : String,
	cualesIntervencion : String,
	tratamientosRecibidos : String,
	medicamentos : String,
	cualesMedicamentos : String,
	medicamentosEfectos : String,
	diagnosticos : String
},{ _id : false });

var desarrolloEvolutivo = new Schema({
	edadSientaSolo : String,
	edadCamino : String,
	desempenoAVD : String,
	estabilidadCaminar : Number,
	caidasFrecuentes : Number,
	dominanciaLateral : Number,
	garra : Number,
	pinza : Number,
	pinzaComo : Number,
	dibuja : Number,
	escribe : Number,
	corta : Number
},{ _id : false });

var destrezasSocialesComunicativas = new Schema({
	imtaDespedirAplaudir : Number,
	diceDiezPalabras : Number,
	formulaPreguntas : Number,
	hablaFrases : Number,
	esperaTurno : Number,
	ofreceAyuda : Number,
	seComporta : Number,
	reccionCorrrecta : Number
  
},{ _id : false });
var comportamientoLudico = new Schema({
	conQueJuega : String,
	conQuienJuega : String,
	dondeJuega : String,
	actividadesInteres : String,
	personalidad : String
  
},{ _id : false });
var situacionSocial = new Schema({
	personasFamilia : Number,
	jefeFemenino : String,
	beneficiarioProgramaSocial : String,
	porcentajeRegistroSocial : Number,
	ingresoMensual : Number,
	ingresoPerCapita : Number
  
},{ _id : false });


var AnamnesisSchema = new Schema({

	paciente: { type: Schema.Types.ObjectId,ref:'Paciente',unique: true ,required: [true,'El paciente es necesario']},
	user: { type: Schema.Types.ObjectId,ref:'User',unique: false ,required: [true,'El profesional es necesario']},
	fecha: { type: String, required: [true,'La fecha es necesario']},
	antecedentesFamiliares: antecedentesFamiliares,
	antecedentesSalud: antecedentesSalud,
	historialClinico: historialClinico,
	desarrolloEvolutivo: desarrolloEvolutivo,
	destrezasSocialesComunicativas: destrezasSocialesComunicativas,
	comportamientoLudico: comportamientoLudico,
	situacionSocial: situacionSocial
	
},{ collection: 'anamnesis'}); // esto es para evitar que se grave como Anamneses

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Anamnesis', AnamnesisSchema);