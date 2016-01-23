'use strict';

var ParseCloud = require('parse-cloud-express');
var Parse = ParseCloud.Parse;
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var express = require('express');
var path = require('path');
var environ = require('./utils/environ');
var info = { url:{ base:path.resolve('.') } };
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

environ(environ.get('ENVRC', info.url.base +'/.environment'));
environ.set('LOG_DIR_PATH', process.cwd(), true);
app.set('port', environ.get('PORT', 3000));
app.set('views', info.url.base +'/views');
app.set('static', info.url.base +'/public');
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
	response.render('index', { env:info, menu:Menu });
});

app.get('/flux/:project', function(request, response){
	info.params = request.params;
	response.render('pages/flux', { env:info });
});

app.get('/archives/:data', function(request, response){
	info.params = request.params;
	response.render('pages/archives', { env:info });
});

app.get('/contact', function(request, response){
	response.render('pages/contact', { env:info });
});

app.all('*', function(request, response, next){
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'X-Requested-With');
	response.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	response.header('X-Powered-By', ' 3.2.1');
	response.header('Content-Type', 'application/json;charset=utf-8');
	request.method === 'OPTIONS'? response.send(200) : next();
});

app.listen(app.get('port'), function(){
	var host = this.address().address;
	var port = this.address().port;
	console.log('Node app is running at http://%s:%s', host, port);
});