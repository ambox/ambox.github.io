/* global ambox */
var q = require('q');
var qs = require('querystring');
var https = require('https');

var Parse = function(options){
	Parse.request(options);
};

Parse.headers = {
	'X-Parse-Application-Id':ambox.uri('env.service.parse.appId'),
	'X-Parse-REST-API-Key':ambox.uri('env.service.parse.apiKey')
};

Parse.defaults = {
	headers:Parse.headers,
	host:'api.parse.com',
	port:443
};

['get', 'delete', 'head', 'jsonp'].forEach(function(method){
	Parse[method] = function(hook, options){
		return this.request(ambox.merge({}, options, {
			path:'/1/'+ hook,
			method:method
		}));
	};
});

['post', 'put', 'patch'].forEach(function(method){
	Parse[method] = function(hook, data, options){
		return this.request(ambox.merge({}, options, {
			path:'/1/'+ hook,
			method:method,
			data:data
		}));
	};
});

Parse.batch = function(requests){
	return Parse.post('batch', { requests:requests });
};

Parse.request = function(options){
	var defer = q.defer();
	options = ambox.merge({}, options, Parse.defaults);
	console.log('request:', options);
	return defer.promise;
};

module.exports = ambox.uri('Parse', Parse);