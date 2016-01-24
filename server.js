/* global global, ambox */
var scope = require('./server/utils/scope').stub(global, 'ambox');
var server = scope.uri('server', require('./server/index').create());
var app = server.init(onInitServer);
server.start();

function onInitServer(app){
	
	var Menu = {
		'/flux':'Flux',
		'/archives':'Archives',
		'/contact':'Contact'
	};
	
	app.get('/', function(request, response){
		response.render('index', { menu:Menu });
	});

	app.get('/flux/:uid?', function(request, response){
		response.render('pages/flux', { menu:Menu });
	});

	app.get('/archives/:uid?', function(request, response){
		response.render('pages/archives', { menu:Menu });
	});

	app.get('/contact', function(request, response){
		response.render('pages/contact', { menu:Menu });
	});
	
}