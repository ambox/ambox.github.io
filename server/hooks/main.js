/* global ambox */
var Parse = require('parse');
var Menu = {
	'/flux':'Flux',
	'/archives':'Archives',
	'/contact':'Contact'
};

exports.index = function(request, response){
	response.render('index', { menu:Menu });
};

exports.flux = function(request, response){
	response.render('pages/flux', { menu:Menu });
};

exports.archives = function(request, response){
	response.render('pages/archives', { menu:Menu });
};

exports.contact = function(request, response){
	Parse.createObject('Message', { hello: 'world1' }).then(function(value){
		console.log('[POST]:', value);
		response.render('pages/contact', { menu:Menu, messages:value });
	}).catch(function(reason){
		console.log('[POST ERROR]:', reason);
		response.render('pages/contact', { menu:Menu });
	});
};