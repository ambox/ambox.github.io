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

var Server = function(cfg){
	this.cfg = ambox.merge({}, cfg);
	this.app = express();
};

Server.create = function(cfg){
	return new Server(cfg);
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
	this.app.locals.title = ambox.uri('env.app.title');
	this.app.locals.description = ambox.uri('env.app.description');
	this.app.locals.keywords = ambox.uri('env.app.keywords');
	this.app.locals.favicon = ambox.uri('env.app.favicon');
	this.app.locals.logo = ambox.uri('env.app.logo');
	this.app.locals.googleAnalyticsAppId = ambox.uri('env.service.googleAnalytics.appId');
	this.app.locals.facebookAppId = ambox.uri('env.service.facebook.appId');
	this.app.locals.server = ambox.uri('env.url.server');
};

Server.prototype.initMiddleware = function(){
	this.app.set('showStackError', true);
	this.app.enable('jsonp callback');
	this.app.use(compress({ filter:this.initCompress, level:9 }));
	this.app.use(bodyParser.urlencoded({ extended:true }));
	this.app.use(bodyParser.json());
	this.app.use(methodOverride());
	this.app.use(cookieParser());
	this.app.use(flash());
};

Server.prototype.initCompress = function(request, response){
	var content = /javascript|json|text|css|font|svg/;
	var header = response.getHeader('Content-Type');
	return content.test(header);
};

Server.prototype.initViewEngine = function(){
	nunjucks.configure('views', { autoescape:true, express:this.app });
	this.app.set('view engine', 'html');
	this.app.set('views', ambox.uri('env.url.host') +'/views');
};

Server.prototype.initHeaders = function(){
	var EIGHTEEN_WEAKS = 10886400000;
	this.app.disable('x-powered-by');
	this.app.use(helmet.xframe());
	this.app.use(helmet.xssFilter());
	this.app.use(helmet.nosniff());
	this.app.use(helmet.ienoopen());
	this.app.use(helmet.hsts({
		maxAge:EIGHTEEN_WEAKS,
		includeSubdomains:true,
		force:true
	}));
};

Server.prototype.initStaticFiles = function(){
	this.app.use('/', express.static(path.resolve('static')));
	this.app.use(favicon('static/'+ this.app.locals.favicon));
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
			module(this.app, auth);
		}
	}.bind(this));
};

Server.prototype.initErrorRoutes = function(){
	this.app.use(function(error, request, response, next){
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
	return this.app;
};

Server.prototype.start = function(callback){
	var port = ambox.uri('env.url.port');
	var host = ambox.uri('env.url.host');
	this.app.listen(port, host, function(){
		console.log('['+ chalk.white(ambox.uri('env.app.title'))+ ']\n|');
		console.log('|    '+chalk.green('Environment: ')+ ambox.uri('env.node'), 'localhost'));
		console.log('|    '+chalk.green('Server: ')+ ambox.uri('env.url.server'));
		console.log('|_');
		callback && callback(this.app, this.cfg);
	});
};

module.exports = ambox.uri('Server', Server);