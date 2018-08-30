'use strict'

 // var fs = require('fs');
 // var path = require('path');
 // var bcrypt = require('bcryptjs');
 var Profesional = require('../models/profesional');
 // var jwt = require('../services/jwt');
 // var menu = require('../controllers/menu')

//================================================
// CREAR UN PROFESIONAL
//================================================

function saveProfesional(req,res){
	var profesional = new Profesional();
	//var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var params = req.body;
	
	profesional.user = params.user;
	if (params.profesion !=null){
	profesional.profesion = params.profesion;
	}
	//var disponiblesemana =[];
	profesional.horaSemana = [];
	profesional.horasDia = [];	

	if( profesional.user !=null ){
				//Guardar profesional
				profesional.save((err, profesionalStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar profesional'
						});
					}else{
						if(!profesionalStored){
							res.status(404).send({message: 'No se ha registrado el profesional'});
						}else{
							res.status(200).send({
								profesional: profesionalStored,
							});
						}
					}
				});
	}else{
		res.status(400).send({message: 'User no indicado'});
	}
}

//================================================
// ACTUALIZAR UN PROFESIONAL
//================================================

function updateProfesional(req,res){
	
	var userId = req.params.id; // éste parámetro se pone en el url despues de OJO se busca por el ID de Usuario No de Profesional
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  
	Profesional.findOneAndUpdate({user: userId}, params, { new: true }, (err, profesionalUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar el profesional',
								error: err	});
		}else{
			if(!profesionalUpdated){
				res.status(404).send({
					message: 'No encuentra el profesional asociado al Usuario Id',
			    });
			}else{
				res.status(200).send({profesional: profesionalUpdated });
			}
		}
	});
}

//================================================
// MOSTRAR TODOS LOS PROFESIONALES PAGINADOS
//================================================
function listProfesionales(req,res){

	var desde = req.query.desde || 0;
	desde= Number(desde);

	Profesional.find({})
	   .populate('user', '_id name email image')
	   .skip(desde)
	   .limit(10)	
	   .exec(
	   		(err, profesionales) => {

	   			// var pro=[];
	   			// profesionales.forEach((item,index) =>{
	   			// 	if(item.user.role == 'PROFESIONAL_ROLE'){
	   			// 		pro.push(item);
	   			// 	}
	   			// });
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando profesionales'});
	   			}else{
	   				Profesional.count({}, (err,conteo) =>{
	   					res.status(200).send({
								profesionales: profesionales,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}

//================================================
// MOSTRAR UN PROFESIONAL
//================================================

function buscaProfesional(req,res){
	var usetId = req.params.id; // éste parámetro se pone en el url despues 
	
	Profesional.findOne({'user': usetId}, (err, profesionalFound) => {
		if(err){
			res.status(500).send({message: 'Error al buscar profesional'});
		}else{
			res.status(200).send({profesional: profesionalFound});
		}
	});
}

//================================================
// ELIMINAR PROFESIONAL
//================================================

function deleteProfesional(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	Profesional.findOneAndRemove({user: userId}, (err, profesionalRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar profesional'});
		}else{
			if(!profesionalRemoved){
				res.status(400).send({message: 'Este usuario no tine perfil de Profesional'});
			}else{
				res.status(200).send({user: profesionalRemoved});
			}
		}
	});
}

module.exports = {
	saveProfesional,
	updateProfesional,
	listProfesionales,
	deleteProfesional,
	buscaProfesional
};