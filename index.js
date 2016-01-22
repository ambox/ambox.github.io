var ParseCloud = require('parse-cloud-express');
var Parse = ParseCloud.Parse;
var nunjucks = require('nunjucks');
var express = require('express');
var info = {};//require('./server/info');
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

Parse.Cloud.define('hello', function(request, response) {
	response.success('Hello from Cloud Code on Node.');
});

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');
app.set('views', __dirname +'/views');
app.use('/webhooks', ParseCloud.app);
app.use(express.static(__dirname +'/public'));

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

app.all('*', function(request, response){
	response.status(404).render('http/404');
});

app.listen(app.get('port'), function(){
	var host = this.address().address;
	var port = this.address().port;
	console.log('Node app is running at http://%s:%s', host, port);
});