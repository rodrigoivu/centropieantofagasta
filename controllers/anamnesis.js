'use strict'

 var Anamnesis = require('../models/anamnesis');
 //================================================
// CREAR ANAMNESIS
//================================================

function saveAnamnesis(req,res){
	var anamnesis = new Anamnesis(req.body);

	if( anamnesis.paciente !=null && anamnesis.user !=null && anamnesis.fecha !=null){
				//Guardar profesional
				anamnesis.save((err, anamnesisStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar anamneisis'
						});
					}else{
						if(!anamnesisStored){
							res.status(404).send({message: 'No se ha registrado el anamnesis'});
						}else{
							res.status(200).send({
								anamnesis: anamnesisStored,
							});
						}
					}
				});
	}else{
		res.status(400).send({message: 'Faltan datos obligatorios'});
	}
}

//================================================
// ACTUALIZAR ANAMNESIS PACIENTE
//================================================

function updateAnamnesis(req,res){
	
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  
	Anamnesis.findOneAndUpdate({'paciente': pacienteId}, params, { new: true }, (err, anamnesisUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar el anamnesis',
								error: err	});
		}else{
			if(!anamnesisUpdated){
				res.status(404).send({
					message: 'No encuentra la ficha de anamnesis asociado al paciente',
			    });
			}else{
				res.status(200).send({anamnesis: anamnesisUpdated });
			}
		}
	});
}

//================================================
// MOSTRAR ANAMNESIS PACIENTE
//================================================
function pacienteAnamnesis(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	//var regex = new RegExp(pacienteId, 'i');
	Anamnesis.findOne({'paciente': pacienteId})
	   .populate('paciente', '_id name email rut')
	   .populate('user', '_id name')
	   .exec(
	   		(err, anamnesis) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando anamnesis'});

	   			}else{
	   				res.status(200).send({
								anamnesis: anamnesis,
					});
	   				
	   			}
	   		}
	   	);
}

function listaFichas(req,res){

Anamnesis.find({},'-_id fecha')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, anamnesis) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando fichas de Anamnesis'});

	   			}else{
	   				Anamnesis.count({}, (err,conteo) =>{
	   					res.status(200).send({
								fechas: anamnesis,
								total: conteo
						});
	   				 });
	   			}
	   		});

}

module.exports = {
	saveAnamnesis,
	updateAnamnesis,
	pacienteAnamnesis,
	listaFichas
};
