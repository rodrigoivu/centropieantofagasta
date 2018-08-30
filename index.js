'use strict'

var mongoose = require('mongoose');
var app = require('./app');
//var port = process.env.PORT || 3977;
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/adminpie',(err,res) => {
if (err) {
	throw err;
}else{
	console.log("La conexión a la base de datos está funcionando correctamente...");

	app.listen(port, function(){
    console.log("Servidor de adminpie escuchando en http://localhost:" + port);
	});
}
});