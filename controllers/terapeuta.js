'use strict'

 var  Terapeuta = require('../models/terapeuta');


//================================================
// CREAR 
//================================================
function saveTerapeuta(req,res){
var  terapeuta = new Terapeuta(req.body);

	if( terapeuta.paciente !=null && terapeuta.user !=null && terapeuta.fecha !=null){
				//Guardar profesional
				terapeuta.save((err, terapeutaStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar ficha de terapeuta'
						});
					}else{
						if(!terapeutaStored){
							res.status(404).send({message: 'No se ha registrado ficha de terapeuta'});
						}else{
							res.status(200).send({
								terapeuta: terapeutaStored,
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

// function updateTerapeuta(req,res){
// 	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
// 	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
// 	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  
// 	Terapeuta.findOneAndUpdate([{'paciente': pacienteId}, {'fecha': pacienteFecha}], params, { new: true }, (err, terapeutaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
// 		if(err){
// 			res.status(500).send({message: 'Error al actualizar la ficha de Terapeuta',
// 								error: err	});
// 		}else{
// 			if(!terapeutaUpdated){
// 				res.status(404).send({
// 					message: 'No encuentra la ficha de Terapeuta asociado al paciente',
// 			    });
// 			}else{
// 				res.status(200).send({terapeuta: terapeutaUpdated });
// 			}
// 		}
// 	});
// }

function updateTerapeuta(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)

	Terapeuta.findOneAndUpdate({}, params, { new: true })
				.and ([{'paciente': pacienteId}, {'fecha': pacienteFecha}])
				.exec((err, terapeutaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
							if(err){
								res.status(500).send({message: 'Error al actualizar la ficha de Terapeuta',
													error: err	});
							}else{
								if(!terapeutaUpdated){
									res.status(404).send({
										message: 'No encuentra la ficha de Terapeuta asociado al paciente',
								    });
								}else{
									res.status(200).send({terapeuta: terapeutaUpdated });
								}
							}
				});
}

//================================================
// MOSTRAR 
//================================================

function pacienteTerapeuta(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	//var regex = new RegExp(pacienteId, 'i');
	Terapeuta.find({'paciente': pacienteId})
	   .populate('paciente', '_id name email rut')
	   .populate('user', '_id name')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, terapeuta) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando ficha de Terapeuta'});

	   			}else{
	   				//Terapeuta.count({}, (err,conteo) =>{
	   					res.status(200).send({
								terapeuta: terapeuta,
								total: terapeuta.length
						});
	   				//});
	   			}
	   		}
	   	);
}

function listaFichas(req,res){

Terapeuta.find({},'-_id fecha')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, terapeuta) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando fichas de Terapeuta'});

	   			}else{
	   				Terapeuta.count({}, (err,conteo) =>{
	   					res.status(200).send({
								fechas: terapeuta,
								total: conteo
						});
	   				 });
	   			}
	   		});
}

module.exports = {
	saveTerapeuta,
	updateTerapeuta,
	pacienteTerapeuta,
	listaFichas
};