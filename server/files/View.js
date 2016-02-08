/* global ambox */
var $ = require('jquery');
var DOM = require('jsdom');
var nunjucks = require('nunjucks');

var View = function(options){
	return this.configure(options);
};

View.prototype.configure = function(options){
	return options;
};

View.prototype.render = function(route, request, response, data){
	data = ambox.merge({}, request.app.locals, data);
	this.compile(route, data, function(error, $){
		if(error){
			return console.error(error);
		}
		console.log('title:', $('head>title').text());
		console.log('description:', $('head>meta[name="description"]').attr('content'));
		console.log('canonical:', $('head>link[rel="canonical"]').attr('href'));
	});
	if(request.xhr){
	}else response.render(route, data);
};

View.prototype.compile = function(route, data, callback){
	nunjucks.render(route +'.html', data, this.parse(callback));
};

View.prototype.parse = function(callback){
	return function(error, markup){
		if(error){
			return callback && callback(error, null);
		}
		console.log('markuo:', markup);
		DOM.env(markup, [], ambox.bind(function(errors, html){
			this.$ = $(html);
			callback(null, this.$);
			html.close();
		}, this));
	};
};

module.exports = ambox.uri('files.View', new View());