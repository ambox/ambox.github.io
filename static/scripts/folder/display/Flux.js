define(['scope', 'jquery', './UI'], function(scope, $, UI){

	function Flux(){
		this.super.call(this);
	}

	Flux.prototype = Object.create(UI.prototype);
	Flux.prototype.constructor = Flux;
	Flux.prototype.super = UI;

	Flux.home = function(ctx){
		console.log('Flux.home');
		$('body [ui-view]').html(ctx.template.content);
	};

	Flux.index = function(ctx){
		console.log('Flux.index');
		$('body [ui-view]').html(ctx.template.content);
	};

	Flux.new = function(){
		console.log('Flux.new');
	};

	Flux.show = function(ctx){
		console.log('Flux.show', ctx.params.uid);
	};

	Flux.edit = function(ctx){
		console.log('Flux.edit', ctx.params.uid);
	};

	Flux.prototype.attach = function(){
		console.log('Flux->attached');
	};

	Flux.prototype.detach = function(){
		console.log('Flux->detached');
	};

	Flux.prototype.resize = function(evt){
		console.log('Flux->resized:', evt);
	};

	return scope.uri('folder.display.Flux', Flux);
});