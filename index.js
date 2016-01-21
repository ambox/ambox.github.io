var ParseCloud = require('parse-cloud-express');
var Parse = ParseCloud.Parse;
var nunjucks = require('nunjucks');
var express = require('express');
var app = express();

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
	response.render('index');
});

app.get('/flux', function(request, response){
	response.render('pages/flux');
});

app.get('/archives', function(request, response){
	response.render('pages/archives');
});

app.get('/contact', function(request, response){
	response.render('pages/contact');
});

app.all('*', function(request, response){
	response.status(404).render('http/404');
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});