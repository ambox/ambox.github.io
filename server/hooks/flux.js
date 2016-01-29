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
	response.format(new ResponseFile(response, {
		templateUrl:'pages/flux',
		data:defaults,
		jsonp:{},
		json:{},
		html:'',
		text:''
	}));
};