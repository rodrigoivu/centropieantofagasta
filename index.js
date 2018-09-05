'use strict'
var https = require('https');
var fs = require('fs');

var mongoose = require('mongoose');
var app = require('./app');
//var port = process.env.PORT || 3977;
var port = process.env.PORT || 3789;


//Certificados
var key = fs.readFileSync('/etc/nginx/certs/centropiecmds.cl/key.pem');
var cert = fs.readFileSync( '/etc/nginx/certs/centropiecmds.cl/fullchain.pem' );
var ca = fs.readFileSync( '/etc/nginx/certs/centropiecmds.cl/ca.pem' );

var options = {
	key: key,
	cert: cert,
	ca: ca
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/adminpie',(err,res) => {
if (err) {
	throw err;
}else{
	console.log("La conexión a la base de datos está funcionando correctamente...");



    https.createServer(options, app).listen(port, function(){
    console.log("Servidor de adminpie escuchando en http://localhost:" + port);
	});

	// app.listen(port, function(){
 //    console.log("Servidor de adminpie escuchando en http://localhost:" + port);
	// });
}
});