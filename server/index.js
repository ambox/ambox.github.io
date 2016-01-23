'use strict';

var ParseCloud = require('parse-cloud-express');
var Parse = ParseCloud.Parse;
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var express = require('express');
var path = require('path');
var environ = require('./utils/environ');
var cfg = require('./env/cfg');
var app = express();

var Menu = {
	'/flux':'Flux',
	'/archives':'Archives',
	'/contact':'Contact'
};

nunjucks.configure('views', {
	autoescape:true,
	express:app
});


//////////////////////////////////////////////////////////////
// Configuration
//////////////////////////////////////////////////////////////

environ(environ.get('ENVRC', cfg.host +'/.environment'));
environ.set('LOG_DIR_PATH', cfg.host, true);
app.set('port', cfg.port);
app.set('views', cfg.host +'/views');
app.set('static', cfg.host +'/public');
app.set('view engine', 'html');


//////////////////////////////////////////////////////////////
// Middleware
//////////////////////////////////////////////////////////////

app.use('/webhooks', ParseCloud.app);
app.use(express.static(app.get('static')));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(methodOverride());


//////////////////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////////////////

app.get('/', function(request, response){
	cfg.query = request.query;
	response.render('index', { env:cfg, menu:Menu });
});

app.get('/flux/:uid?', function(request, response){
	cfg.query = request.query;
	response.render('pages/flux', { env:cfg, menu:Menu });
});

app.get('/archives/:uid?', function(request, response){
	cfg.query = request.query;
	response.render('pages/archives', { env:cfg, menu:Menu });
});

app.get('/contact', function(request, response){
	cfg.query = request.query;
	response.render('pages/contact', { env:cfg, menu:Menu });
});

app.all('*', function(request, response, next){
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'X-Requested-With');
	response.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	response.header('X-Powered-By', ' 3.2.1');
	response.header('Content-Type', 'application/json;charset=utf-8');
	request.method === 'OPTIONS'? response.send(200) : next();
});

app.listen(cfg.port, cfg.host, function(){
	var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + cfg.host + ':' + cfg.port;
	console.log('Node app is running at %s://%s:%s', cfg.protocol, cfg.host, cfg.port);
});