define(['scope', 'jquery', './UI'], function(scope, $, UI){

	function Errors(){
		this.super.call(this);
	}

	Errors.prototype = Object.create(UI.prototype);
	Errors.prototype.constructor = Errors;
	Errors.prototype.super = UI;

	Errors.notFound = function(){
		console.log('Errors.notFound');
	};

	Errors.prototype.attach = function(){
		console.log('Errors->attached');
	};

	Errors.prototype.detach = function(){
		console.log('Errors->detached');
	};

	Errors.prototype.resize = function(evt){
		console.log('Errors->resized:', evt);
	};

	return scope.uri('folder.display.Errors', Errors);
});