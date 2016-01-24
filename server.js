/* global global, ambox */
var caste = require('./server/caste').stub(global, 'ambox');
var server = caste.uri('server', require('./server/index').create());
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
			menu:Menu
		});
	});
	
	app.route('*').get(function(request, response){
		response.status(404).format({
			'text/html':function(){
				var url = request.originalUrl;
				response.render('server/404', { url:url, menu:Menu });
			},
			'application/json':function(){
				response.json({ menu:Menu });
			},
			'default':function(){
				response.send({ menu:Menu });
			}
		});
	});
	
}