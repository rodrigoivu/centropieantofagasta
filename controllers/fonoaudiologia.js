'use strict'

 var  Fonoaudiologia = require('../models/fonoaudiologia');

//================================================
// CREAR 
//================================================
function saveFonoaudiologia(req,res){
	var fonoaudiologia = new Fonoaudiologia(req.body);

	if( fonoaudiologia.paciente !=null && fonoaudiologia.user !=null && fonoaudiologia.fecha !=null){
				//Guardar profesional
				fonoaudiologia.save((err, fonoaudiologiaStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar ficha de fonoaudiologia'
						});
					}else{
						if(!fonoaudiologiaStored){
							res.status(404).send({message: 'No se ha registrado ficha de fonoaudiologia'});
						}else{
							res.status(200).send({
								fonoaudiologia: fonoaudiologiaStored,
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

// function updateFonoaudiologia(req,res){
// 	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
// 	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
// 	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  	
//   	console.log(pacienteFecha);
// 	Fonoaudiologia.findOneAndUpdate([{'paciente': pacienteId}, {'fecha': pacienteFecha}], params, { new: true }, (err, fonoaudiologiaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
// 		if(err){
// 			res.status(500).send({message: 'Error al actualizar la ficha de Fonoaudiologia',
// 								error: err	});
// 		}else{
// 			if(!fonoaudiologiaUpdated){
// 				res.status(404).send({
// 					message: 'No encuentra la ficha de Fonoaudiologia asociado al paciente',
// 			    });
// 			}else{
// 				res.status(200).send({fonoaudiologia: fonoaudiologiaUpdated });
// 			}
// 		}
// 	});
// }

function updateFonoaudiologia(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	var pacienteFecha = req.params.fecha; // éste parámetro se pone en el url despues 
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)

	Fonoaudiologia.findOneAndUpdate({}, params, { new: true })
				.and ([{'paciente': pacienteId}, {'fecha': pacienteFecha}])
				.exec((err, fonoaudiologiaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
							if(err){
								res.status(500).send({message: 'Error al actualizar la ficha de Fonoaudiologia',
													error: err	});
							}else{
								if(!fonoaudiologiaUpdated){
									res.status(404).send({
										message: 'No encuentra la ficha de Fonoaudiologia asociado al paciente',
								    });
								}else{
									res.status(200).send({fonoaudiologia: fonoaudiologiaUpdated });
								}
							}
				});
}
//================================================
// MOSTRAR 
//================================================

function pacienteFonoaudiologia(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	//var regex = new RegExp(pacienteId, 'i');
	Fonoaudiologia.find({'paciente': pacienteId})
	   .populate('paciente', '_id name email rut')
	   .populate('user', '_id name')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, fonoaudiologia) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando ficha de Fonoaudiologia'});

	   			}else{
	   				// Fonoaudiologia.count({}, (err,conteo) =>{
	   					res.status(200).send({
								fonoaudiologia: fonoaudiologia,
								total: fonoaudiologia.length
						});
	   				// });
	   			}
	   		});
}

function listaFichas(req,res){

Fonoaudiologia.find({},'-_id fecha')
	   .sort([['fecha', -1]])
	   .exec(
	   		(err, fonoaudiologia) => {
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando fichas de Fonoaudiologia'});

	   			}else{
	   				Fonoaudiologia.count({}, (err,conteo) =>{
	   					res.status(200).send({
								fechas: fonoaudiologia,
								total: conteo
						});
	   				 });
	   			}
	   		});

}


module.exports = {
	saveFonoaudiologia,
	updateFonoaudiologia,
	pacienteFonoaudiologia,
	listaFichas
};