'use strict'

 var Reserva = require('../models/reserva');

//================================================
// CREAR RESERVA
//================================================

function saveReserva(req,res){
	var reserva = new Reserva(req.body);

	if( reserva.paciente !=null && reserva.user !=null &&reserva.fecha !=null && reserva.horaReservado !=null && reserva.poshora !=null){
				//Guardar profesional
				reserva.save((err, reservaStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar reserva'
						});
					}else{
						if(!reservaStored){
							res.status(404).send({message: 'No se ha registrado la reserva'});
						}else{
							res.status(200).send({
								reserva: reservaStored,
							});
						}
					}
				});
	}else{
		res.status(400).send({message: 'Faltan Datos (Paciente, Usuario, Fecha, Hora, poshora)'});
	}
}

//================================================
// MOSTRAR TODAS LAS RESERVAS PAGINADOS
//================================================
function listReservas(req,res){

	var desde = req.query.desde || 0;
	desde= Number(desde);

	Reserva.find({})
	   .populate('paciente', 'name rut fijo celular email')
	   .populate('user', 'name')
	   .skip(desde)
	   .limit(10)
	   .sort([['fecha', -1]])	
	   .exec(
	   		(err, reservas) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando reservas'});
	   			}else{
	   				Reserva.count({}, (err,conteo) =>{
	   					res.status(200).send({
								reservas: reservas,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}

//================================================
// BUSCAR RESERVAS POR FECHA
//================================================
function listReservasPorFechaUsuario(req,res){
    var userId = req.params.id_user;
	var fechaSeleccionada=req.query.fecha || '0-0-000';
	var repiteDia=req.query.repitedia;
	//var repiteAno=req.query.repiteano;
	// var regexUserId = new RegExp(userId, 'i');//no funciona esto del regex en este caso
    // var regexFecha = new RegExp(fechaSeleccionada, 'i'); //no finciona esto del regex en este caso
    
    
	Reserva.find({'user': userId})
	   //.and([ {'user': userId}, {'fecha': fechaSeleccionada} ])  
	   .or([ {'repiteDia': repiteDia}, {'fecha': fechaSeleccionada} ])  // est es para bloquear la reserva repitiendo el dia
	   .populate('paciente', 'name')
	   .exec(
	   		(err, reservas) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando reservas'});
	   			}else{
   					res.status(200).send({
						reservas: reservas,
					});
	   				
	   				
	   			}
	   		}
	   	);
}

//================================================
// ELIMINAR RESERVA
//================================================

function deleteReserva(req,res){
	var reservaId = req.params.id; // éste parámetro se pone en el url despues de /
	Reserva.findByIdAndRemove(reservaId, (err, reservaRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar reserva'});
		}else{
			if(!reservaRemoved){
				res.status(404).send({message: 'No existe reserva con ese id'});
			}else{
				res.status(200).send({reserva: reservaRemoved});
			}
		}
	});
}


module.exports = {
	saveReserva,
	listReservas,
	listReservasPorFechaUsuario,
	deleteReserva
	
};