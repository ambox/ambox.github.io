/* global ambox */
var nunjucks = require('nunjucks');

var View = function(options){
	this.configure(options);
};

View.prototype.configure = function(name, options){
	if(ambox.typeOf(name) === 'String' && ambox.typeOf(options) === 'Object'){
		nunjucks.configure(name, options);
	}
};

View.prototype.render = function(route, request, response, params){
	var env = ambox.uri('env');
	var data = ambox.merge({ app:env.app, url:env.url }, params);
	if(request.xhr){
		this.renderTemplate(route, data, function(error, $){
			if(error)return console.error(error);
			var $head = $('head');
			var $body = $('body');
			data.title = $head.find('>title').text();
			data.description = $head.find('>meta[name="description"]').attr('content');
			data.canonical = $head.find('>link[rel="canonical"]').attr('href');
			data.content = $($body.find($body.data('ui-spa'))[0] || $body.find('[ui-view]')[0]).html();
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify(data));
			response.end();
		});
	}else response.render(route, data);
};

View.prototype.renderTemplate = function(route, data, callback){
	nunjucks.render(route +'.html', data, this.parse(callback));
};

View.prototype.parse = function(callback){
	var jsdom = require('jsdom');
	return function(error, markup){
		if(error){
			return callback && callback(error, null);
		}
		jsdom.env(markup, [], ambox.bind(function(errors, window){
			var $ = require('jquery');
			callback(false, $(window));
			window.close();
		}, this));
	};
};

module.exports = ambox.uri('files.View', new View());