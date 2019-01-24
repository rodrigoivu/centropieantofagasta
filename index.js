'use strict'
 var https = require('https');
 var fs = require('fs');

var mongoose = require('mongoose');
var app = require('./app');
//var port = process.env.PORT || 3977;
var port = process.env.PORT || 3789;


//Certificados

var credentials = {
	ca: fs.readFileSync("/etc/nginx/certs/centropiecmds.cl/ca.pem"), //la certification authority o CA
	key: fs.readFileSync("/etc/nginx/certs/centropiecmds.cl/key.pem"), //la clave SSL, que es el primer archivo que generamos ;)
	cert: fs.readFileSync("/etc/nginx/certs/centropiecmds.cl/fullchain.pem") //el certificado
	// //cert: fs.readFileSync("/etc/nginx/certs/centropiecmds.cl/fullchain.pem", 'utf8')
};

 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/adminpie',(err,res) => {
if (err) {
	throw err;
}else{
	console.log("La conexión a la base de datos está funcionando correctamente...");



   
 //    https.createServer(credentials, app).listen(port, function(){
 //    console.log("Servidor de adminpie escuchando en http://localhost:" + port);
	// });

	app.listen(port, function(){
    console.log("Servidor de adminpie escuchando en http://localhost:" + port);
	});
}
});