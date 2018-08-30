'use strict'
 var fs = require('fs');
 var path = require('path');
 var Pesquisa = require('../models/pesquisa');

 //================================================
// CREAR UNA PESQUISA
//================================================

function crearPesquisa(req,res){
	var pesquisa = new Pesquisa(req.body);
		pesquisa.save((err, pesquisaStored) => {
			if(err){
				res.status(500).send({
					error: err,
					message: 'Error al guardar pesquisa'
				});
			}else{
				if(!pesquisaStored){
					res.status(404).send({message: 'No se ha registrado la pesquisa'});
				}else{
					res.status(200).send({
						pesquisa: pesquisaStored,
					});
				}
			}
		});
}


//================================================
// ACTUALIZAR UNa PESQUISA
//================================================

function updatePesquisa(req,res){
	
	var pesquisaId = req.params.id; // éste parámetro se pone en el url despues de OJO se busca por el ID de Usuario No de Profesional
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)

 
	Pesquisa.findByIdAndUpdate(pesquisaId, params, { new: true }, (err, pesquisaUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar la pesquisa',
								error: err	});
		}else{
			if(!pesquisaUpdated){
				res.status(404).send({
					message: 'No encuentra la pesquisa',
			    });
			}else{
				res.status(200).send({pesquisa: pesquisaUpdated });
			}
		}
	});
}

//================================================
// MOSTRAR TODAS LAS PESQUISAS
//================================================
function listPesquisas(req,res){

	Pesquisa.find({},(err, pesquisas) => {

	   			if (err){
	   				res.status(500).send({message: 'Error cargando pacientes'});
	   			}else{
	   				res.status(200).send({
								pesquisas: pesquisas,
						});
	   			}
	   		});
	   	
}

//================================================
// MOSTRAR UNA PESQUISA
//================================================

function buscaPesquisa(req,res){
	var pesquisaId = req.params.id; // éste parámetro se pone en el url despues 
	
	Pesquisa.findById(pesquisaId, (err, pesquisaFound) => {
		if(err){
			res.status(500).send({message: 'Error al buscar pesquisa'});
		}else{
			res.status(200).send({pesquisa: pesquisaFound});
		}
	});
}

//================================================
// CARGAR ARCHIVO
//================================================

function uploadFileXls(req,res){
	var pesquisaId = req.params.id;
	var titulo = 'pequisa';
	var nombreUsuario = req.params.usuario;
	

	if(req.files){
		var file_path = req.files.archivo.path;
		var file_ext = path.extname(file_path);

		var extensionesValidas = [ '.xls', '.xlsx' ];


			if( extensionesValidas.indexOf(file_ext) >= 0 ){
				//personalizar Nombre
				var nombreArchivo = `${titulo}-${pesquisaId}-${ new Date().getMilliseconds() }${ file_ext }`;

				var path_destino = `./uploads/pacientes/xls/${nombreArchivo}`;

				//Mover archivo
				fs.rename( file_path,path_destino, function(err){
						if (err){
							res.status(500).send({message: 'Error al mover archivo'});
						}else{
							Pesquisa.findByIdAndUpdate(pesquisaId, {pesquisaXls: nombreArchivo, subidoPor: nombreUsuario}, (err, pesquisaUpdated) => {
			 							if(pesquisaUpdated){
									    	var pathViejo = './uploads/pacientes/xls/' + pesquisaUpdated.pesquisaXls;
			 						    	eliminaArchivo(pathViejo);
			            				    res.status(200).send({ pesquisa: pesquisaUpdated, archivo: nombreArchivo });
							}});
						}
				});

			}else{
				res.status(400).send({message: 'Extención del archivo no válida'});
			}
		
	}else{
		res.status(400).send({message: 'No has subido ningún archivo...'});
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
// OBTENER ARCHIVO XLS
//================================================

function getFileXls(req,res){
	var file = req.params.file;

	var path_file = path.resolve(__dirname, `../uploads/pacientes/xls/${ file }`);

	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}
}

module.exports = {
	crearPesquisa,
	updatePesquisa,
	listPesquisas,
	buscaPesquisa,
	uploadFileXls,
	getFileXls
	
};

