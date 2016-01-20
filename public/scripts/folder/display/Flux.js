define(['scope', 'jquery', './UI'], function(scope, $, UI){
	
	function Flux(){
		this.super.call(this);
	}
	
	Flux.prototype = Object.create(UI.prototype);
	Flux.prototype.constructor = Flux;
	Flux.prototype.super = UI;
	
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