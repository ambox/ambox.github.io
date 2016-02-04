/* global ambox */
var methodOverride = require('method-override');
var connectFlash = require('connect-flash');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var nunjucks = require('nunjucks');
var favicon = require('serve-favicon');
var express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');
var chalk = require('chalk');
var path = require('path');

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
	this.app.locals.title = this.cfg.app.title;
	this.app.locals.description = this.cfg.app.description;
	this.app.locals.keywords = this.cfg.app.keywords;
	this.app.locals.favicon = this.cfg.app.favicon;
	this.app.locals.logo = this.cfg.app.logo;
	this.app.locals.googleAnalyticsAppId = this.cfg.service.googleAnalytics.appId;
	this.app.locals.facebookAppId = this.cfg.service.facebook.appId;
	this.app.locals.server = this.cfg.url.server;
};

Server.prototype.initMiddleware = function(){
	this.app.enable('jsonp callback');
	this.app.use(morgan('dev'));
	this.app.use(compression({ filter:this.initCompression, level:9 }));
	this.app.use(bodyParser.urlencoded({ extended:true }));
	this.app.use(bodyParser.json());
	this.app.use(methodOverride());
	this.app.use(cookieParser());
	this.app.use(connectFlash());
};

Server.prototype.initCompression = function(request, response){
	var content = /javascript|json|text|css|font|svg/;
	var header = response.getHeader('Content-Type');
	return content.test(header);
};

Server.prototype.initViewEngine = function(){
	nunjucks.configure('views', { autoescape:true, express:this.app });
	this.app.set('view engine', 'html');
	this.app.set('views', path.join(this.cfg.url.host, 'views'));
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
	this.app.use(favicon(path.join('static', this.app.locals.favicon)));
};

Server.prototype.initSession = function(){
	// N/A yet.
};

Server.prototype.initModules = function(list){
	var auth = Server.basicAuth('admin', 'admin');
	list = Array.isArray(list)? list : [list];
	list.forEach(function(module){
		if(typeof module === 'function'){
			module(this.app, auth);
		}else if(module === Object(module)){
			Object.keys(module).forEach(function(key){
				if(typeof module[key] === 'function'){
					module[key](this.app, auth);
				}
			}.bind(this));
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
	var port = this.cfg.url.port;
	var host = this.cfg.url.host;
	this.app.listen(port, host, ambox.bind(function(){
		console.log('['+ chalk.white(this.cfg.app.title)+ ']\n|');
		console.log('|    '+chalk.green('Environment: ')+ this.cfg.role);
		console.log('|    '+chalk.green('Server: ')+ this.cfg.url.server);
		console.log('|_');
		callback && callback(this.app, this.cfg);
	}, this));
};

module.exports = ambox.uri('Server', Server);
