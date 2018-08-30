'use strict'

 var Kinesiologia = require('../models/kinesiologia');

//================================================
// CREAR 
//================================================
function saveKinesiologia(req,res){
var  kinesiologia = new Kinesiologia(req.body);

	if( kinesiologia.paciente !=null && kinesiologia.user !=null && kinesiologia.fecha !=null){
				//Guardar profesional
				kinesiologia.save((err, kinesiologiaStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar ficha de kinesiologia'
						});
					}else{
						if(!kinesiologiaStored){
							res.status(404).send({message: 'No se ha registrado ficha de kinesiologia'});
						}else{
							res.status(200).send({
								kinesiologia: kinesiologiaStored,
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

// function updateKinesiologia(req,res){
// 	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
// 	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
// 	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  
// 	Kinesiologia.findOneAndUpdate([{'paciente': pacienteId}, {'fecha': pacienteFecha}], params, { new: true }, (err, kinesiologiaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
// 		if(err){
// 			res.status(500).send({message: 'Error al actualizar la ficha de Kinesiologia',
// 								error: err	});
// 		}else{
// 			if(!kinesiologiaUpdated){
// 				res.status(404).send({
// 					message: 'No encuentra la ficha de Kinesiologia asociado al paciente',
// 			    });
// 			}else{
// 				res.status(200).send({kinesiologia: kinesiologiaUpdated });
// 			}
// 		}
// 	});
// }

function updateKinesiologia(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)

	Kinesiologia.findOneAndUpdate({}, params, { new: true })
				.and ([{'paciente': pacienteId}, {'fecha': pacienteFecha}])
				.exec((err, kinesiologiaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
							if(err){
								res.status(500).send({message: 'Error al actualizar la ficha de Kinesiologia',
													error: err	});
							}else{
								if(!kinesiologiaUpdated){
									res.status(404).send({
										message: 'No encuentra la ficha de Kinesiologia asociado al paciente',
								    });
								}else{
									res.status(200).send({kinesiologia: kinesiologiaUpdated });
								}
							}
				});
}

//================================================
// MOSTRAR 
//================================================

function pacienteKinesiologia(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	//var regex = new RegExp(pacienteId, 'i');
	Kinesiologia.find({'paciente': pacienteId})
	   .populate('paciente', '_id name email rut')
	   .populate('user', '_id name')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, kinesiologia) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando ficha Kinesiologia'});

	   			}else{
	   				//Kinesiologia.count({}, (err,conteo) =>{
	   					res.status(200).send({
								kinesiologia: kinesiologia,
								total: kinesiologia.length
						});
	   				//});
	   			}
	   		}
	   	);
}

function listaFichas(req,res){

Kinesiologia.find({},'-_id fecha')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, kinesiologia) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando fichas de Kinesiologia'});

	   			}else{
	   				Kinesiologia.count({}, (err,conteo) =>{
	   					res.status(200).send({
								fechas: kinesiologia,
								total: conteo
						});
	   				 });
	   			}
	   		});
}

module.exports = {
	saveKinesiologia,
	updateKinesiologia,
	pacienteKinesiologia,
	listaFichas
};