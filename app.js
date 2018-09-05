'use strict'
// var http = require('http');
// var https = require('https');
// var fs = require('fs');

var express = require ('express');
var bodyParser = require ('body-parser');
var path = require('path');

var app = express();

//Certificados
// var key = fs.readFileSync('/etc/nginx/certs/centropiecmds.cl/key.pem');
// var cert = fs.readFileSync( '/etc/nginx/certs/centropiecmds.cl/fullchain.pem' );
// var ca = fs.readFileSync( '/etc/nginx/certs/centropiecmds.cl/ca.pem' );

// var options = {
// 	key: key,
// 	cert: cert,
// 	ca: ca
// };

// http.createServer(app).listen(80);
// https.createServer(options, app).listen(443);

// cargar rutas

var user_routes = require('./routes/user');
var busqueda_routes = require('./routes/busqueda');
var profesional_routes = require('./routes/profesional');
var paciente_routes = require('./routes/paciente');
var reserva_routes = require('./routes/reserva');
var bloqueo_routes = require('./routes/bloqueo');
var anamnesis_routes = require('./routes/anamnesis');
var fonoaudiologia_routes = require('./routes/fonoaudiologia');
var general_routes = require('./routes/general');
var kinesiologia_routes = require('./routes/kinesiologia');
var psicologia_routes = require('./routes/psicologia');
var terapeuta_routes = require('./routes/terapeuta');
var pesquisa_routes = require('./routes/pesquisa');

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:false}));
// create application/json parser
app.use(bodyParser.json());

// CORS configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*'); //permite el acceso a todos los dominios, a las apis
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept,Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

	next();

	// if (req.secure) {
 //        next();
 //    } else {
 //        res.redirect('https://' + req.headers.host + req.url);
 //    }
});

//rutas base
app.use('/',express.static('client', { redirect: false }));
app.use('/api', user_routes);
app.use('/api', busqueda_routes);
app.use('/api', profesional_routes);
app.use('/api', paciente_routes);
app.use('/api', reserva_routes);
app.use('/api', bloqueo_routes);
app.use('/api', anamnesis_routes);
app.use('/api', fonoaudiologia_routes);
app.use('/api', general_routes);
app.use('/api', kinesiologia_routes);
app.use('/api', psicologia_routes);
app.use('/api', terapeuta_routes);
app.use('/api', pesquisa_routes);

app.get('*', function(req,res,next){
	res.sendFile(path.resolve('client/index.html'));
});

module.exports = app;