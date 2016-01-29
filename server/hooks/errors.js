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

exports.badRequest = function(request, response){
	response.status(500).render('server/500', defaults);
};

exports.notFound = function(request, response){
	response.status(404).format(new ResponseFile(response, {
		templateUrl:'server/404',
		data:defaults,
		jsonp:{},
		json:{},
		html:'',
		text:''
	}));
};