'use strict'
 var fs = require('fs');
 var path = require('path');
 var Paciente = require('../models/paciente');

//================================================
// CREAR UN PACIENTE
//================================================

function savePaciente(req,res){
	var paciente = new Paciente(req.body);

	if( paciente.name !=null ){
				//Guardar profesional
				paciente.save((err, pacienteStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar paciente'
						});
					}else{
						if(!pacienteStored){
							res.status(404).send({message: 'No se ha registrado el paciente'});
						}else{
							res.status(200).send({
								paciente: pacienteStored,
							});
						}
					}
				});
	}else{
		res.status(400).send({message: 'Indicar Nombre de Paciente'});
	}
}

//================================================
// ACTUALIZAR UN PACIENTE
//================================================

function updatePaciente(req,res){
	
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues de OJO se busca por el ID de Usuario No de Profesional
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)

 
	Paciente.findByIdAndUpdate(pacienteId, params, { new: true }, (err, pacienteUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar el paciente',
								error: err	});
		}else{
			if(!pacienteUpdated){
				res.status(404).send({
					message: 'No encuentra el profesional asociado al Paciente Id',
			    });
			}else{
				res.status(200).send({paciente: pacienteUpdated });
			}
		}
	});
}

//================================================
// MOSTRAR TODOS LOS PACIENTES
//================================================
function listPacientes(req,res){

	var desde = req.query.desde || 0;
	desde= Number(desde);

	Paciente.find({})
	   .skip(desde)
	   .limit(10)	
	   .exec(
	   		(err, pacientes) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando pacientes'});
	   			}else{
	   				Paciente.count({}, (err,conteo) =>{
	   					res.status(200).send({
								pacientes: pacientes,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}

//================================================
// MOSTRAR UN PACIENTE
//================================================

function buscaPaciente(req,res){
	var pacienteId = req.params.id; // éste parámetro se pone en el url despues 
	
	Paciente.findById(pacienteId, (err, pacienteFound) => {
		if(err){
			res.status(500).send({message: 'Error al buscar paciente'});
		}else{
			res.status(200).send({paciente: pacienteFound});
		}
	});
}

//================================================
// CARGAR ARCHIVO
//================================================

function uploadFilePdf(req,res){
	var pacienteId = req.params.id;
	var titulo = req.params.titulo;
	var profesionalProfesion = req.params.profesionalProfesion


	if(req.files){
		var file_path = req.files.archivo.path;
		var file_ext = path.extname(file_path);
		//var file_name = path.basename(file_path);

		//var nhj=req.files.image;
		var extensionesValidas = [ '.pdf' ];

		//if(file_ext == '.png' || file_ext == '.jpg' || file_ext == '.gif'){
			if( extensionesValidas.indexOf(file_ext) >= 0 ){
			//personalizar Nombre
			var nombreArchivo = `${titulo}-${pacienteId}-${ new Date().getMilliseconds() }${ file_ext }`;

			var path_destino = `./uploads/pacientes/pdf/${nombreArchivo}`;

			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
					if (err){
						res.status(500).send({message: 'Error al mover archivo'});
					}else{
						
						switch (titulo) {
						    case "autorizacionSalida":

						        Paciente.findByIdAndUpdate(pacienteId, {autorizacionSalida: nombreArchivo, protocolo1SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.autorizacionSalida;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});

						        break;
						    case "autorizacionTransporte":

						        Paciente.findByIdAndUpdate(pacienteId, {autorizacionTransporte: nombreArchivo, protocolo2SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.autorizacionTransporte;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});

						        break;
						    case "protocoloAdir":

						        Paciente.findByIdAndUpdate(pacienteId, {protocoloAdir: nombreArchivo, protocolo3SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloAdir;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});

						        break;
						    case "protocoloAdos":

						        Paciente.findByIdAndUpdate(pacienteId, {protocoloAdos: nombreArchivo, protocolo4SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloAdos;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});

						        break;
						    case "protocoloEvaluacion1":

						        Paciente.findByIdAndUpdate(pacienteId, {protocoloEvaluacion1: nombreArchivo, protocolo5SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloEvaluacion1;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});

						        break;
						    case "protocoloEvaluacion2":

						        Paciente.findByIdAndUpdate(pacienteId, {protocoloEvaluacion2: nombreArchivo, protocolo6SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloEvaluacion2;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo, protocolo1SubidoPor: profesionalProfesion });
								}});

						        break;
						    case "protocoloEvaluacion3":
						    	Paciente.findByIdAndUpdate(pacienteId, {protocoloEvaluacion3: nombreArchivo, protocolo7SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloEvaluacion3;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});
								
						        break;
						    case "protocoloEvaluacion4":
						    	Paciente.findByIdAndUpdate(pacienteId, {protocoloEvaluacion4: nombreArchivo, protocolo8SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloEvaluacion4;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});
								
						        break;
						    case "protocoloEvaluacion5":
						    	Paciente.findByIdAndUpdate(pacienteId, {protocoloEvaluacion5: nombreArchivo, protocolo9SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloEvaluacion5;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});
								
						        break;
						    case "protocoloInformeFinal":
						    	Paciente.findByIdAndUpdate(pacienteId, {protocoloInformeFinal: nombreArchivo, protocolo10SubidoPor: profesionalProfesion}, (err, pacienteUpdated) => {
		 							if(pacienteUpdated){
								    	var pathViejo = './uploads/pacientes/pdf/' + pacienteUpdated.protocoloInformeFinal;
		 						    	eliminaArchivo(pathViejo);
		            				    res.status(200).send({ paciente: pacienteUpdated, archivo: nombreArchivo });
								}});
								
						        break;
						               
						        
						}

						
					}
			});


		}else{
			res.status(400).send({message: 'Extención del archivo no válida'});
		}
		
	}else{
		res.status(400).send({message: 'No has subido ninguna imagen...'});
	}
}

function eliminaArchivo(pathViejo){
	if( fs.existsSync(pathViejo)){
	    fs.unlink( pathViejo , err =>{
	         if(err) return console.log(err);
                console.log('file deleted successfully');
	         });
	}
}

//================================================
// OBTENER ARCHIVO
//================================================

function getFilePdf(req,res){
	var file = req.params.file;
	//var path_file = './uploads/users/'+imageFile;

	var path_file = path.resolve(__dirname, `../uploads/pacientes/pdf/${ file }`);

	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}else{
		var pathNoImage = path.resolve( __dirname, '../assets/no-pdf.jpg');
		res.sendFile(pathNoImage);
	}
}

function getFileDoc(req,res){
	var file = req.params.file;
	var path_file = path.resolve(__dirname, `../uploads/pacientes/doc/${ file }`);

	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}
}

module.exports = {
	savePaciente,
	updatePaciente,
	listPacientes,
	uploadFilePdf,
	getFilePdf,
	getFileDoc,
	buscaPaciente
};