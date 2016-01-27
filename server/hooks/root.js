/* global ambox */
var Parse = require('parse/node');

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