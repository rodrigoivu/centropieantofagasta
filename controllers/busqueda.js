var User = require('../models/user');
var Paciente = require('../models/paciente');
var Profesional = require('../models/profesional');


//================================================
// BÚSQUEDA POR COLECCIÓN
//================================================
function findCollection(req,res){
	var busqueda = req.params.busqueda;
	var coleccion = req.params.coleccion;
	var regex = new RegExp(busqueda, 'i');

	var promesa;

	switch(coleccion){
		case 'users':
			promesa = buscarUsuarios( busqueda, regex );
			break;
		case 'pacientes':
			promesa = buscarPacientes( busqueda, regex );
			break;	
		case 'profesionales':
			promesa = buscarProfesionales( busqueda, regex );
			break;		
		default:
			res.status(400).send({ message: 'No existe es tipo de collección' });
	}

    promesa.then( data => {

    	 res.status(200).send({ 
    		[coleccion]: data 
    	});

    });

}

//================================================
// BÚSQUEDA GENERAL
//================================================
function findAll(req,res){

	var busqueda = req.params.busqueda;
	var regex = new RegExp(busqueda, 'i'); //'i' es de insensible expresion regular para que tome el valor de busqueda y no la palabra busqueda
    
	Promise.all([ 
			buscarUsuarios(busqueda, regex),
			buscarPacientes(busqueda, regex) ])
		.then( respuestas =>{
			res.status(200).send({
				users: respuestas[0],
				pacientes: respuestas[1]
			});
		});
}

function buscarUsuarios( busqueda, regex ){

	

	return new Promise((resolve, reject) =>{

	 // User.find({ name: regex }, (err, usuarios) => {
	 //   		if (err){
	 //   			reject('Error al cargar usuarios', err);	
	 //   		}else{
	 //   			resolve(usuarios);
	 //   		}
	 //    });

	  //   User.find([{'name': regex}, {'role': regex}],'name email image role')
			// .exec((err, usuarios) => {
			// 	if (err){
	  //  				reject('Error al cargar usuarios', err);	
	  //  			}else{
		 //   			resolve(usuarios);
		 //   		}
			// });

		User.find({},'name email image role')
			.or([{'name': regex}, {'role': regex}])
			.exec((err, usuarios) => {
				if (err){
	   				reject('Error al cargar usuarios', err);	
	   			}else{
		   			resolve(usuarios);
		   		}
			});	
	});
}

function buscarPacientes( busqueda, regex ){

	return new Promise((resolve, reject) =>{

		Paciente.find()
			.or([{ 'name': regex }, { 'rut': regex }]) // buscar en 2 registros al mismo tiempo
			.exec((err, pacientes) => {
				if (err){
	   				reject('Error al cargar pacientes', err);	
	   			}else{
		   			resolve(pacientes);
		   		}
			});
	});
}

function buscarProfesionales( busqueda, regex ){

	return new Promise((resolve, reject) =>{

		Profesional.find()
		    .populate('user', '_id name email image')
			.or([{ 'profesion': regex }]) // buscar en 2 registros al mismo tiempo
			.exec((err, profesionales) => {
				if (err){
	   				reject('Error al cargar profesionales', err);	
	   			}else{
		   			resolve(profesionales);
		   		}
			});
	});
}

module.exports = {
	findAll,
	findCollection
};