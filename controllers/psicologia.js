'use strict'

 var  Psicologia = require('../models/psicologia');

//================================================
// CREAR 
//================================================
function savePsicologia(req,res){
var  psicologia = new Psicologia(req.body);

	if( psicologia.paciente !=null && psicologia.user !=null && psicologia.fecha !=null){
				//Guardar profesional
				psicologia.save((err, psicologiaStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar ficha de psicologia'
						});
					}else{
						if(!psicologiaStored){
							res.status(404).send({message: 'No se ha registrado ficha de psicologia'});
						}else{
							res.status(200).send({
								psicologia: psicologiaStored,
							});
						}
					}
				});
	}else{
		res.status(400).send({message: 'Faltan datos obligatorios'});
	}
}

//================================================
// ACTUALIZAR 
//================================================

// function updatePsicologia(req,res){
// 	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
// 	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
// 	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  
// 	Psicologia.findOneAndUpdate([{'paciente': pacienteId}, {'fecha': pacienteFecha}], params, { new: true }, (err, psicologiaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
// 		if(err){
// 			res.status(500).send({message: 'Error al actualizar la ficha de Psicologia',
// 								error: err	});
// 		}else{
// 			if(!psicologiaUpdated){
// 				res.status(404).send({
// 					message: 'No encuentra la ficha de Psicologia asociado al paciente',
// 			    });
// 			}else{
// 				res.status(200).send({psicologia: psicologiaUpdated });
// 			}
// 		}
// 	});
// }

function updatePsicologia(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)

	Psicologia.findOneAndUpdate({}, params, { new: true })
				.and ([{'paciente': pacienteId}, {'fecha': pacienteFecha}])
				.exec((err, psicologiaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
							if(err){
								res.status(500).send({message: 'Error al actualizar la ficha de Psicología',
													error: err	});
							}else{
								if(!psicologiaUpdated){
									res.status(404).send({
										message: 'No encuentra la ficha de Psicología asociado al paciente',
								    });
								}else{
									res.status(200).send({psicologia: psicologiaUpdated });
								}
							}
				});
}

//================================================
// MOSTRAR 
//================================================

function pacientePsicologia(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	//var regex = new RegExp(pacienteId, 'i');
	Psicologia.find({'paciente': pacienteId})
	   .populate('paciente', '_id name email rut')
	   .populate('user', '_id name')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, psicologia) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando ficha de Psicologia'});

	   			}else{
	   				//Psicologia.count({}, (err,conteo) =>{
	   					res.status(200).send({
								psicologia: psicologia,
								total: psicologia.length
						});
	   				//});
	   			}
	   		}
	   	);
}

function listaFichas(req,res){

Psicologia.find({},'-_id fecha')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, psicologia) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando fichas de Psicologia'});

	   			}else{
	   				Psicologia.count({}, (err,conteo) =>{
	   					res.status(200).send({
								fechas: psicologia,
								total: conteo
						});
	   				 });
	   			}
	   		});
}

module.exports = {
	savePsicologia,
	updatePsicologia,
	pacientePsicologia,
	listaFichas
};