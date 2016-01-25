/* global ambox */
var q = require('q');
var request = require('request');
request.delete = request.del;

var Parse = function(options){
	Parse.request(options);
};

Parse.headers = {
	'X-Parse-Application-Id':ambox.uri('env.service.parse.appId'),
	'X-Parse-REST-API-Key':ambox.uri('env.service.parse.secret')
};

Parse.defaults = {
	headers:Parse.headers,
	timeout:5000,
	method:'get'
};

['get', 'delete', 'head'].forEach(function(method){
	Parse[method] = function(hook, options){
		return this.request(ambox.merge({}, options, {
			method:method,
			url:'http://api.parse.com/1/'+ hook
		}));
	};
});

['post', 'put', 'patch'].forEach(function(method){
	Parse[method] = function(hook, data, options){
		return this.request(ambox.merge({}, options, {
			method:method,
			url:'http://api.parse.com/1/'+ hook,
			form:data
		}));
	};
});

Parse.batch = function(requests){
	return Parse.post('batch', { requests:requests });
};

Parse.request = function(options){
	options = ambox.merge({}, options, Parse.defaults);
	var defer = q.defer();
	var requestMethod = request[options.method.toLowerCase()];
	requestMethod(options.url, options, function(error, response, body){
		if(error){
			return defer.reject(error);
		}
		defer.resolve(body);
	});
	return defer.promise;
};

Parse.createObject = function(className, data){
	return Parse.post('classes/'+ className, data, { 'Content-Type':'application/json' });
};

module.exports = ambox.uri('Parse', Parse);