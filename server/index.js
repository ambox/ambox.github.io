/* global ambox */
var methodOverride = require('method-override');
var consolidate = require('consolidate');
var bodyParser = require('body-parser');
var express = require('express');
var nunjucks = require('nunjucks');
var helmet = require('helmet');
var chalk = require('chalk');
var path = require('path');
var environ = require('./utils/environ');
var cfg = require('./env/cfg');
var app = express();

var Server = function(options){
	this.options = ambox.merge({}, options);
};

Server.create = function(options){
	return new Server(options);
};

Server.prototype.initLocalVars = function(){
	app.locals.title = ambox.uri('env.app.title');
	app.locals.description = ambox.uri('env.app.description');
	app.locals.keywords = ambox.uri('env.app.keywords');
	app.locals.favicon = ambox.uri('env.app.favicon');
	app.locals.logo = ambox.uri('env.app.logo');
	app.locals.googleAnalyticsAppId = ambox.uri('env.service.googleAnalytics.appId');
	app.locals.facebookAppId = ambox.uri('env.service.facebook.appId');
	app.use(function(request, response, next){
		var url = request.headers.host + request.originalUrl;
		response.locals.host = request.protocol + '://' + request.hostname;
		response.locals.url = request.protocol + '://' + url;
		next();
	});
};

Server.prototype.initMiddleware = function(){
	app.set('showStackError', true);
	app.enable('jsonp callback');
	app.use(bodyParser.urlencoded({ extended:true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
};

Server.prototype.initViewEngine = function(){
	nunjucks.configure('views', { autoescape:true, express:app });
	app.set('view engine', 'html');
	app.set('views', cfg.url.host +'/views');
};

Server.prototype.initHeaders = function(){
	var FOUR_AND_HALF_MONTHS = 10886400000;
	app.disable('x-powered-by');
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.use(helmet.hsts({
		maxAge:FOUR_AND_HALF_MONTHS,
		includeSubdomains:true,
		force:true
	}));
};

Server.prototype.initStaticFiles = function(){
	app.use('/', express.static(path.resolve('public')));
};

Server.prototype.initErrorHandler = function(){
	app.use(function(error, request, response, next){
		if(!error){
			return next();
		}
		console.warn('[RouteError '+ error.stack +'\n]');
		response.redirect('/server-error');
	});
};

Server.prototype.init = function(callback){
	this.initLocalVars();
	this.initMiddleware();
	this.initViewEngine();
	this.initHeaders();
	this.initStaticFiles();
	callback && callback(app, cfg);
	this.initErrorHandler();
	return app;
};

Server.prototype.start = function(callback){
	var port = ambox.uri('env.url.port');
	var host = ambox.uri('env.url.host');
	app.listen(port, host, function(){
		console.log('['+chalk.white(cfg.app.title)+']\n|');
		console.log('|    '+chalk.green('Environment: ')+ environ.get('NODE_ENV', 'localhost'));
		console.log('|    '+chalk.green('Server: ')+ ambox.uri('env.url.server'));
		console.log('|_');
		callback && callback(app, cfg);
	});
};

module.exports = ambox.uri('Server', Server);