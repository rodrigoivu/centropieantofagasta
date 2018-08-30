'use strict'

 var  General = require('../models/general');

//================================================
// CREAR 
//================================================
function saveGeneral(req,res){
var  general= new General(req.body);

	if( general.paciente !=null && general.user !=null && general.fecha !=null){
				//Guardar profesional
				general.save((err, generalStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar ficha general'
						});
					}else{
						if(!generalStored){
							res.status(404).send({message: 'No se ha registrado ficha general'});
						}else{
							res.status(200).send({
								general: generalStored,
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

// function updateGeneral(req,res){
// 	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
// 	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
// 	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  
// 	General.findOneAndUpdate([{'paciente': pacienteId}, {'fecha': pacienteFecha}], params, { new: true }, (err, generalUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
// 		if(err){
// 			res.status(500).send({message: 'Error al actualizar la ficha general',
// 								error: err	});
// 		}else{
// 			if(!generalUpdated){
// 				res.status(404).send({
// 					message: 'No encuentra la ficha general asociado al paciente',
// 			    });
// 			}else{
// 				res.status(200).send({general: generalUpdated });
// 			}
// 		}
// 	});
// }

function updateGeneral(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)

	General.findOneAndUpdate({}, params, { new: true })
				.and ([{'paciente': pacienteId}, {'fecha': pacienteFecha}])
				.exec((err, generalUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
							if(err){
								res.status(500).send({message: 'Error al actualizar la ficha general',
													error: err	});
							}else{
								if(!generalUpdated){
									res.status(404).send({
										message: 'No encuentra la ficha general asociado al paciente',
								    });
								}else{
									res.status(200).send({ general: generalUpdated });
								}
							}
				});
}

//================================================
// MOSTRAR 
//================================================

function pacienteGeneral(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	//var regex = new RegExp(pacienteId, 'i');
	General.find({'paciente': pacienteId})
	   .populate('paciente', '_id name email rut')
	   .populate('user', '_id name')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, general) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando ficha General'});

	   			}else{
	   				//General.count({}, (err,conteo) =>{
	   					res.status(200).send({
								general: general,
								total: general.length
						});
	   				//});
	   			}
	   		}
	   	);
}

function listaFichas(req,res){

General.find({},'-_id fecha')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, general) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando fichas de General'});

	   			}else{
	   				General.count({}, (err,conteo) =>{
	   					res.status(200).send({
								fechas: general,
								total: conteo
						});
	   				 });
	   			}
	   		});
}

module.exports = {
	saveGeneral,
	updateGeneral,
	pacienteGeneral,
	listaFichas
};