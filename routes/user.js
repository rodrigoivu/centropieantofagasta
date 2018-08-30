'use strict'

var express = require('express');
var UserController = require ('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});

 api.post('/login', UserController.loginUser);
 api.post('/register', UserController.saveUser);
 api.get('/recover/:email', UserController.buscaPorMail);
 api.get('/users',[md_auth.ensureAuth,md_auth.ensureAdmin], UserController.listUsers);
 api.put('/update-user/:id',[md_auth.ensureAuth,md_auth.ensureAdminIgualUsuario],UserController.updateUser);
 api.put('/update-user-password/:id',UserController.updateUserPassword);
 api.put('/upload-image-user/:id',[md_auth.ensureAuth,md_auth.ensureAdminIgualUsuario, md_upload],UserController.uploadImage);
 api.get('/get-image-user/:imageFile',UserController.getImageFile);
 api.delete('/remove-user/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], UserController.deleteUser);
 api.get('/renuevatoken',md_auth.ensureAuth, UserController.renuevaToken);
 
module.exports = api;