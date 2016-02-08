/* global ambox */
var nunjucks = require('nunjucks');

var View = function(options){
	return this.configure(options);
};

View.prototype.configure = function(options){
	return options;
};

View.prototype.render = function(route, request, response, data){
	data = ambox.merge({}, request.app.locals, data);
	if(request.xhr){
		this.compile(route, data, function(error, $){
			if(error)return console.error(error);
			var $head = $('head');
			var $body = $('body');
			data.title = $head.find('>title').text() };
			data.description = $head.find('>meta[name="description"]').attr('content');
			data.canonical = $head.find('>link[rel="canonical"]').attr('href');
			data.html = $body.find($body.data('ui-spa') || '[ui-view]').html();
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify(data));
			response.end();
		});
	}else response.render(route, data);
};

View.prototype.compile = function(route, data, callback){
	nunjucks.render(route +'.html', data, this.parse(callback));
};

View.prototype.parse = function(callback){
	var DOM = require('jsdom');
	return function(error, markup){
		if(error){
			return callback && callback(error, null);
		}
		DOM.env(markup, [], ambox.bind(function(errors, window){
			var $ = require('jquery');
			callback(false, $(window));
			window.close();
		}, this));
	};
};

module.exports = ambox.uri('files.View', new View());