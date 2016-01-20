define(['scope', 'jquery', './UI'], function(scope, $, UI){
	
	function Archives(){
		this.super.call(this);
	}
	
	Archives.prototype = Object.create(UI.prototype);
	Archives.prototype.constructor = Archives;
	Archives.prototype.super = UI;
	
	Archives.prototype.attach = function(){
		console.log('Archives->attached');
	};
	
	Archives.prototype.detach = function(){
		console.log('Archives->detached');
	};
	
	Archives.prototype.resize = function(evt){
		console.log('Archives->resized:', evt);
	};

	return scope.uri('folder.display.Archives', Archives);
});