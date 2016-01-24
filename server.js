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
	
	app.route('/').get(function(request, response){
		response.render('index', { menu:Menu });
	});

	app.route('/flux/:uid?').get(function(request, response){
		response.render('pages/flux', { menu:Menu });
	});

	app.route('/archives/:uid?').get(function(request, response){
		response.render('pages/archives', { menu:Menu });
	});

	app.route('/contact').get(function(request, response){
		response.render('pages/contact', { menu:Menu });
	});
	
	app.route('/server-error').get(function(request, response){
		response.status(500).render('server/500', {
			error:'Oops! Something went wrong...'
		});
	});
	
	app.route('/:url/*').get(function(request, response){
		response.status(404).format({
			'text/html':function(){
				response.render('server/404', {
					url:request.originalUrl
				});
			},
			'application/json':function(){
				response.json({
					error:'Path not found'
				});
			},
			'default':function(){
				response.send('Path not found');
			}
		});
	});
	
}