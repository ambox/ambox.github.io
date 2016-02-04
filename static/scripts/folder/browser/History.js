define(['scope'], function(scope){

	var supportState = 'pushState' in history;
	var listener = supportState? 'popstate' : 'hashchange';	

	function History(options){
		console.log('History->created');
	}
	
	History.prototype.attach = function(){
		console.log('History->attach:');
	};
	
	History.prototype.detach = function(){
		console.log('History->detach:');
	};
	
	History.prototype.set404 = function(){
		console.log('History->set404');
	};

	History.prototype.forward = function(index){
		console.log('History->forward');
	};
	
	History.prototype.backward = function(index){
		history.back();
	};
	
	History.prototype.navigateTo = function(view){
		console.log('History->navigateTo:');
	};
	
	History.prototype.go = function(index){
		console.log('History->navigateTo:');
	};

	History.prototype.start = function(){
		console.log('urls listen!');
	};

	History.prototype.stop = function(){
		console.log('urls listen!');
	};

	return scope.uri('folder.browser.History', History);
});
