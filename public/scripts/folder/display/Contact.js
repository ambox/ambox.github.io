define(['scope', 'jquery', './UI'], function(scope, $, UI){
	
	function Contact(){
		this.super.call(this);
	}
	
	Contact.prototype = Object.create(UI.prototype);
	Contact.prototype.constructor = Contact;
	Contact.prototype.super = UI;
	
	Contact.prototype.attach = function(){
		console.log('Contact->attached');
	};
	
	Contact.prototype.detach = function(){
		console.log('Contact->detached');
	};
	
	Contact.prototype.resize = function(evt){
		console.log('Contact->resized:', evt);
	};

	return scope.uri('folder.display.Contact', Contact);
});