/* global ambox */
var Parse = require('parse/node');

var menu = {
	'/flux': 'Flux',
	'/archives': 'Archives',
	'/contact': 'Contact'
};

exports.index = function(request, response){
	response.render('pages/contact', { menu:menu });
};