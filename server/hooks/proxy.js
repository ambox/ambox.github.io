/* global ambox */
var https = require('https');

var Parse = function(options){
	Parse.request(options);
};

Parse.headers = {
	'X-Parse-Application-Id':ambox.uri('env.service.parse.appId'),
	'X-Parse-REST-API-Key':ambox.uri('env.service.parse.masterKey')
};

Parse.defaults = {
	headers:Parse.headers,
	host:'api.parse.com',
	port:443
};

['get', 'delete', 'head', 'jsonp'].forEach(function(method){
	Parse[method] = function(hook, options){
		return Parse(ambox.merge({}, options, {
			method:method,
			path:hook
		}));
	};
});

['post', 'put', 'patch'].forEach(function(method){
	Parse[method] = function(hook, data, options){
		return Parse(ambox.merge({}, options, {
			method:method,
			data:data,
			path:hook
		}));
	};
});

Parse.request = function(options){
	options = ambox.merge({}, Parse.defaults, options);
	console.log('request:', options);
};

module.exports = ambox.uri('Parse', Parse);