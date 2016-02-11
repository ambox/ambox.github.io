define(['scope', 'folder/browser/Router'], function(scope, Router){

	var app = Router('[ui-sref]');

	app.use(function(req, res, next){
		console.log('middleware\n\t- req:%s\n\t- res:%s', req, res);
		res.teste = 'aeaea';
		next();
	});

	app.route('/').get(function(req, res, next){
		console.log('res:', res.teste);
	});

	app.route('/flux').get(function flux(req, res, next){
	});

	app.route('/flux/new').get(function(req, res, next){
	});

	app.route('/flux/:uid').get(function(req, res, next){
	});

	app.route('/flux/:uid/edit').get(function(req, res, next){
	});

	app.route('/archives/new').get(function(req, res, next){
	});

	app.route('/archives/:uid').get(function(req, res, next){
	});

	app.route('/archives/:uid/edit').get(function(req, res, next){
	});

	app.route('/contact').get(function(req, res, next){
	});

	app.route('*').get(function(req, res, next){
	});

	return scope.uri('app', app);
});