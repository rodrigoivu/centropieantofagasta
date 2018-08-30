'use strict'

 var fs = require('fs');
 var path = require('path');
 var bcrypt = require('bcryptjs');
 var User = require('../models/user');
 var jwt = require('../services/jwt');
 var menu = require('../controllers/menu')

 //================================================
// RENUEVA TOKEN
//================================================
function renuevaToken(req,res){
    var token=jwt.createToken(req.user);
	res.status(200).send({
		token: token
	});

}

//================================================
// LOGIN
//================================================
function loginUser(req,res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err,user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				//Comprobar la contraseña
				if( bcrypt.compareSync( password,user.password) ){
					//devolver los datos del usuario logueado
					if(params.gethash){
						// devolver un token de jwt
						res.status(200).send({
						id:	user._id,
						user: user,	
						token: jwt.createToken(user),
						ROUTES: menu.obtenerMenu( user.role )
					});
					}else{
						res.status(200).send({user});
					}

				}else{
						res.status(404).send({message: 'El usuario no ha podido loguearse'});
				}
			}
		}
	});
}

//================================================
// RECOVER
//================================================
function buscaPorMail(req,res){
	var email = req.params.email;


	User.findOne({email: email.toLowerCase()}, (err,user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				user.password=':)';
				res.status(200).send({
					id:	user._id,
					user: user	
				});
				
			}
		}
	});
}
//================================================
// MOSTRAR TODOS LOS USUARIOS PAGINADOS
//================================================
function listUsers(req,res){

	var desde = req.query.desde || 0;
	desde= Number(desde);

	User.find({},'name email image role')
	   .skip(desde)
	   .limit(10)	
	   .exec(
	   		(err, usuarios) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando usuarios'});
	   			}else{
	   				User.count({}, (err,conteo) =>{
	   					res.status(200).send({
								users: usuarios,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}

//================================================
// CREAR UN USUARIO
//================================================

function saveUser(req,res){
	var user = new User();

	var params = req.body;


	user.name = params.name;
	if (params.surname){
		user.surname = params.surname;
	}else{
		user.surname = null;
	}
	if (params.image){
		user.image = params.image;
	}else{
		user.image = null;
	}
	
	user.email = params.email;
	user.role ='INITIAL_ROLE';
	

	if(params.password){
		// Encriptar contraseña 
		user.password = bcrypt.hashSync(params.password,10);
		
		if(user.name !=null && user.name !=null && user.email != null){
				//Guardar el usuario
				user.save((err, userStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar el usuario'
						});
					}else{
						if(!userStored){
							res.status(404).send({message: 'No se ha registrado el usuario'});
						}else{
							res.status(200).send({
								user: userStored,
								// tokenUser: req.user
							});
						}
					}
				});
			}else{
				res.status(400).send({message: 'Rellena todos los campos'});
			}
	}else{
		res.status(400).send({message: 'Introduce la contraseña'});
	}

}

//================================================
// ACTUALIZAR CONTRASEÑA
//================================================

function updateUserPassword(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var params = req.body;      // éstos parámetros vienen del x-www-form-urlencoded
	if(params.password){
		// Encriptar contraseña 
		params.password = bcrypt.hashSync(params.password,10);

		User.findByIdAndUpdate(userId, params, { new: true }, (err, userUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar la contraseña'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido cambiar la contraseña'});
			}else{
				userUpdated.password=':)'; //no está guardando este password es solo para no enviarlo
				res.status(200).send({user: userUpdated});
			}
		}
	});
	}

	
}

//================================================
// ACTUALIZAR UN USUARIO
//================================================

function updateUser(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var update = req.body;      // éstos parámetros vienen del x-www-form-urlencoded

	//  if(userId != req.user.sub){  // esto viene de la autorización por token
	// 	return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
	// }

	User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				userUpdated.password=':)'; //no está guardando este password es solo para no enviarlo
				res.status(200).send({user: userUpdated});
			}
		}
	});
}

//================================================
// CARGAR IMAGEN
//================================================

function uploadImage(req,res){
	var userId =req.params.id;
	//var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_ext = path.extname(file_path);
		//var file_name = path.basename(file_path);

		//var nhj=req.files.image;
		var extensionesValidas = [ '.png', '.jpg', '.gif', '.jpeg'];

		//if(file_ext == '.png' || file_ext == '.jpg' || file_ext == '.gif'){
			if( extensionesValidas.indexOf(file_ext) >= 0 ){
			//personalizar Nombre
			var nombreArchivo = `${userId}-${ new Date().getMilliseconds() }${ file_ext }`;

			var path_destino = `./uploads/users/${nombreArchivo}`;

			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
					if (err){
						res.status(500).send({message: 'Error al mover archivo'});
					}else{
						//Actualizar nombre en base de datos
						User.findByIdAndUpdate(userId, {image: nombreArchivo}, (err, userUpdated) => {
 	
							if(!userUpdated){
								res.status(404).send({message: 'No se ha podido actualizar el usuario'});
						    }else{
						    	//Elimina imagen anterior
						    	var pathViejo = './uploads/users/' + userUpdated.image;
						    	if( fs.existsSync(pathViejo)){
			    		            fs.unlink( pathViejo , err =>{
			    			          if(err) return console.log(err);
                                      console.log('file deleted successfully');
			    		            });
			    	}
						    	userUpdated.password=':)'; //esconder password
            				    res.status(200).send({ user: userUpdated, image: nombreArchivo });

						    }

						});
					}
			});


		}else{
			res.status(400).send({message: 'Extención del archivo no válida'});
		}
		
	}else{
		res.status(400).send({message: 'No has subido ninguna imagen...'});
	}
}

//================================================
// OBTENER IMAGEN
//================================================

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	//var path_file = './uploads/users/'+imageFile;

	var path_file = path.resolve(__dirname, `../uploads/users/${ imageFile }`);

	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}else{
		var pathNoImage = path.resolve( __dirname, '../assets/no-img.jpg');
		res.sendFile(pathNoImage);
	}

	// fs.exists(path_file, function(exists){
	// 	if(exists){
			
	// 	}else{
	// 		res.status(200).send({message: 'No existe la imagen...'});
	// 	}
	// });
}

//================================================
// ELIMINAR USUARIO
//================================================

function deleteUser(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	User.findByIdAndRemove(userId, (err, userRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar usuario'});
		}else{
			if(!userRemoved){
				res.status(404).send({message: 'No existe usuario con ese id'});
			}else{
				res.status(200).send({user: userRemoved});
			}
		}
	});
}

module.exports = {
	loginUser,
	listUsers,
	saveUser,
	updateUser,
	uploadImage,
	getImageFile,
	deleteUser,
	renuevaToken,
	buscaPorMail,
	updateUserPassword
};

// }