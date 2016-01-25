/* global ambox */
var Parse = require('../proxies/Parse');

exports.badRequest = function(request, response){
	response.status(500).render('server/500', {
	});
};

exports.notFound = function(request, response){
	var data = {};
	response.status(404).format({
		'text/html':function(){
			data.url = request.originalUrl
			response.render('server/404', data);
		},
		'application/json':function(){
			response.json(data);
		},
		'default':function(){
			response.send(data);
		}
	});
};