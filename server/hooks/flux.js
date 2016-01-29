/* global ambox */
var Parse = require('parse/node');
var ResponseFile = require('../files/ResponseFile');

var defaults = {
	menu:{
		'/flux': 'Flux',
		'/archives': 'Archives',
		'/contact': 'Contact'
	}
};

exports.index = function(request, response){
	response.render('pages/flux', defaults);
};

exports.findAll = function(request, response){
	console.log('format:', request.params.format);
	response.format(new ResponseFile(request, response, {
		templateUrl:'pages/flux',
		params:request.params,
		data:defaults,
		jsonp:{ jsonp:true },
		json:{ json:true },
		html:'<p data-html="true">html:true</p>',
		text:'text:true'
	}));
};

exports.findOne = function(request, response){
	response.render('pages/flux', defaults);
};

exports.create = function(request, response){
	response.render('pages/flux', defaults);
};

exports.update = function(request, response){
	response.render('pages/flux', defaults);
};

exports.delete = function(request, response){
	response.render('pages/flux', defaults);
};