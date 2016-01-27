/* global ambox */
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var express = require('express');
var nunjucks = require('nunjucks');
var helmet = require('helmet');
var chalk = require('chalk');
var path = require('path');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var Parse = require('parse/node');
var basicAuth = require('basic-auth');
var environ = require('./env/environ');
var cfg = require('./env/cfg');
var app = express();

var Server = function(options){
	this.options = ambox.merge({}, options);
};

Server.create = function(options){
	return new Server(options);
};

Server.basicAuth = function(username, password){
	return function(request, response, next){
		var user = basicAuth(request);
		if(!user || user.name !== username || user.pass !== password){
			response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			return response.sendStatus(401);
		}
		next();
	};
};

Server.prototype.initLocalVars = function(){
	app.locals.title = ambox.uri('env.app.title');
	app.locals.description = ambox.uri('env.app.description');
	app.locals.keywords = ambox.uri('env.app.keywords');
	app.locals.favicon = ambox.uri('env.app.favicon');
	app.locals.logo = ambox.uri('env.app.logo');
	app.locals.googleAnalyticsAppId = ambox.uri('env.service.googleAnalytics.appId');
	app.locals.facebookAppId = ambox.uri('env.service.facebook.appId');
	app.locals.server = ambox.uri('env.url.server');
};

Server.prototype.initMiddleware = function(){
	app.set('showStackError', true);
	app.enable('jsonp callback');
	app.use(compress({ filter:this.initCompress, level:9 }));
	app.use(bodyParser.urlencoded({ extended:true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(flash());
};

Server.prototype.initCompress = function(request, response){
	var content = /javascript|json|text|css|font|svg/;
	var header = response.getHeader('Content-Type');
	return content.test(header);
};

Server.prototype.initViewEngine = function(){
	nunjucks.configure('views', { autoescape:true, express:app });
	app.set('view engine', 'html');
	app.set('views', ambox.uri('env.url.host') +'/views');
};

Server.prototype.initHeaders = function(){
	var EIGHTEEN_WEAKS = 10886400000;
	app.disable('x-powered-by');
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.use(helmet.hsts({
		maxAge:EIGHTEEN_WEAKS,
		includeSubdomains:true,
		force:true
	}));
};

Server.prototype.initStaticFiles = function(){
	app.use('/', express.static(path.resolve('static')));
	app.use(favicon('static/'+ app.locals.favicon));
};

Server.prototype.initSession = function(){
	var appId = ambox.uri('env.service.parse.appId');
	var jsKey = ambox.uri('env.service.parse.secret');
	console.log('['+ chalk.white('Parse')+ ']\n|');
	console.log('|    '+chalk.green('appId: ')+ appId);
	console.log('|    '+chalk.green('jsKey: ')+ jsKey);
	console.log('|_');
	Parse.initialize(appId, jsKey);
};

Server.prototype.initModules = function(list){
	var auth = Server.basicAuth('admin', 'admin');
	list = Array.isArray(list)? list : [list];
	list.forEach(function(module){
		if(typeof module === 'function'){
			module(app, auth);
		}
	});
};

Server.prototype.initErrorRoutes = function(){
	app.use(function(error, request, response, next){
		if(!error){
			return next();
		}
		console.warn('[RouteError '+ error.stack +'\n]');
		response.redirect('/server-error');
	});
};

Server.prototype.init = function(modules, callback){
	this.initLocalVars();
	this.initMiddleware();
	this.initViewEngine();
	this.initHeaders();
	this.initStaticFiles();
	this.initSession();
	this.initModules(modules);
	this.initErrorRoutes();
	return app;
};

Server.prototype.start = function(callback){
	var port = ambox.uri('env.url.port');
	var host = ambox.uri('env.url.host');
	app.listen(port, host, function(){
		console.log('['+ chalk.white(ambox.uri('env.app.title'))+ ']\n|');
		console.log('|    '+chalk.green('Environment: ')+ environ.get('NODE_ENV', 'localhost'));
		console.log('|    '+chalk.green('Server: ')+ ambox.uri('env.url.server'));
		console.log('|_');
		callback && callback(app, cfg);
	});
};

module.exports = ambox.uri('Server', Server);