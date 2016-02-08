/* global ambox */
var nunjucks = require('nunjucks')

var View = function(options){
	this.configure(options)
}

View.prototype.configure = function(options){
	options && nunjucks.configure('views', options)
}

View.prototype.render = function(route, request, response, params){
	var env = ambox.uri('env')
	var data = ambox.merge({ app:env.app, url:env.url }, params)
	if(request.xhr){
		this.compile(route, data, function(error, $){
			if(error)return console.error(error)
			var $head = $('head')
			var $body = $('body')
			data.title = $head.find('>title').text()
			data.description = $head.find('>meta[name="description"]').attr('content')
			data.canonical = $head.find('>link[rel="canonical"]').attr('href')
			data.content = $($body.find($body.data('ui-spa'))[0] || $body.find('[ui-view]')[0]).html()
			response.writeHead(200, { 'Content-Type': 'application/json' })
			response.write(JSON.stringify(data))
			response.end()
		})
	}else response.render(route, data)
}

View.prototype.xhr = function(){
}

View.prototype.compile = function(route, data, callback){
	nunjucks.render(route +'.html', data, this.parse(callback))
}

View.prototype.parse = function(callback){
	return function(error, markup){
		if(error)return callback(error, null)
		var jsdom = require('jsdom')
		jsdom.env(markup, ambox.bind(function(fault, window){
			if(fault)return callback(fault, null)
			var jquery = require('jquery')
			callback(false, jquery(window))
			window.close()
		}, this))
	}
}

module.exports = ambox.uri('files.View', new View())