'use strict'

 var Bloqueo = require('../models/bloqueo');

 //================================================
// CREAR UN BLOQUEO
//================================================

function saveBloqueo(req,res){
	var bloqueo = new Bloqueo(req.body);

	if( bloqueo.dateDesde !=null && bloqueo.dateHasta !=null && bloqueo.descripcion !=null){
				//Guardar profesional
				bloqueo.save((err, bloqueoStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar bloqueo'
						});
					}else{
						if(!bloqueoStored){
							res.status(404).send({message: 'No se ha registrado el bloqueo'});
						}else{
							res.status(200).send({
								bloqueo: bloqueoStored,
							});
						}
					}
				});
	}else{
		res.status(400).send({message: 'Indicar Datos de fechas y descripción'});
	}
}

//================================================
// MOSTRAR TODOS LOS BLOQUEOS
//================================================
function listBloqueos(req,res){
	Bloqueo.find({}, (err, bloqueos) => {

	   			if (err){
	   				res.status(500).send({message: 'Error cargando pacientes'});
	   			}else{
	   				Bloqueo.count({}, (err,conteo) =>{
	   					res.status(200).send({
								bloqueos: bloqueos,
								total: conteo
						});
	   				});
	   				
	   			}
	   		});
}

//================================================
// ELIMINAR BLOQUEO
//================================================

function deleteBloqueo(req,res){
	var bloqueoId = req.params.id; // éste parámetro se pone en el url despues de /
	Bloqueo.findByIdAndRemove(bloqueoId, (err, bloqueoRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar bloqueo'});
		}else{
			if(!bloqueoRemoved){
				res.status(404).send({message: 'No existe bloqueo con ese id'});
			}else{
				res.status(200).send({bloqueo: bloqueoRemoved});
			}
		}
	});
}

module.exports = {
	saveBloqueo,
	listBloqueos,
	deleteBloqueo
	
};