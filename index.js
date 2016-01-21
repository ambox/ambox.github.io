var nunjucks = require('nunjucks');
var express = require('express');
var app = express();

nunjucks.configure('views', {
	autoescape:true,
	express:app
});

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'html');
app.set('views', __dirname +'/views');
app.use(express.static(__dirname +'/public'));

app.get('/', function(request, response){
	response.render('pages/main');
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

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});