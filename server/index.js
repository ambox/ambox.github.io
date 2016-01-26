/* global ambox */
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const express = require('express');
const nunjucks = require('nunjucks');
const helmet = require('helmet');
const chalk = require('chalk');
const path = require('path');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const Parse = require('parse/node');
const basicAuth = require('basic-auth');
const environ = require('./env/environ');
const cfg = require('./env/cfg');
const app = express();

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
	app.use(function(request, response, next){
		var url = request.headers.host + request.originalUrl;
		response.locals.host = request.protocol +'://'+ request.hostname;
		response.locals.url = request.protocol +'://'+ url;
		next();
	});
};

Server.prototype.initMiddleware = function(){
	app.set('showStackError', true);
	app.enable('jsonp callback');
	app.use(bodyParser.urlencoded({ extended:true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(flash());
	app.use(compress({
		filter:function(request, response){
			var content = /json|text|javascript|css|font|svg/;
			var header = response.getHeader('Content-Type');
			return content.test(header);
		},
		level:9
	}));
};

Server.prototype.initViewEngine = function(){
	nunjucks.configure('views', { autoescape:true, express:app });
	app.set('view engine', 'html');
	app.set('views', cfg.url.host +'/views');
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
		console.log('['+chalk.white(cfg.app.title)+']\n|');
		console.log('|    '+chalk.green('Environment: ')+ environ.get('NODE_ENV', 'localhost'));
		console.log('|    '+chalk.green('Server: ')+ ambox.uri('env.url.server'));
		console.log('|_');
		callback && callback(app, cfg);
	});
};

module.exports = ambox.uri('Server', Server);