define([
	'scope',
	'page',
	'./display/UI',
	'./display/Flux',
	'./display/Errors',
	'./display/Contact',
	'./display/Archives'
], function(scope, page, UI){

	function Router(){
		this.use(UI.render);
	}

	Router.prototype.start = function(){
		var route = scope.folder.display;
		this.route('/', route.Flux.home);
		this.route('/flux', route.Flux.index);
		this.route('/flux/new', route.Flux.new);
		this.route('/flux/:uid', route.Flux.show);
		this.route('/flux/:uid/edit', route.Flux.edit);
		this.route('/archives', route.Archives.index);
		this.route('/archives/new', route.Archives.new);
		this.route('/archives/:uid', route.Archives.show);
		this.route('/archives/:uid/edit', route.Archives.edit);
		this.route('/contact', route.Contact.index);
		this.route('*', route.Errors.notFound);
		page.start();
	};

	Router.prototype.stop = page.stop;
	Router.prototype.show = page.show;
	Router.prototype.redirect = page.redirect;
	Router.prototype.request = page;
	Router.prototype.route = page;
	Router.prototype.base = page.base;
	Router.prototype.exit = page.exit;
	Router.prototype.use = page;

	return scope.uri('folder.Router', Router);
});