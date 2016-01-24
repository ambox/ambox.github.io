/* global ambox */
console.log('Parse.appId:', ambox.uri('env.service.parse.appId'));
console.log('Parse.masterKey:', ambox.uri('env.service.parse.masterKey'));

var Parse = function(options){
	Parse.request(options);
};

['get', 'delete', 'head', 'jsonp'].forEach(function(method){
	Parse[method] = function(url, options){
		return Parse(ambox.merge({}, options, {
			method:method,
			url:url
		}));
	};
});

['post', 'put', 'patch'].forEach(function(method){
	Parse[method] = function(url, data, options){
		return Parse(ambox.merge({}, options, {
			method:method,
			data:data,
			url:url
		}));
	};
});

Parse.request = function(options){
	console.log('request:', options);
};