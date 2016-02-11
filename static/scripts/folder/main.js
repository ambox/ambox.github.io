define(['scope', 'jquery', 'folder/urls'], function(scope, $){

	function Folder(){
		scope.bindAll(this);
	}

	Folder.prototype.startup = function(){
		$('body').on('click', '[ui-sref]', this.onClickSRef);
		scope.app.request('/');
	};

	Folder.prototype.onClickSRef = function(evt){
		var $target = $(evt.currentTarget);
		var url = $target.attr('ui-sref');
		route(url, function(){
			console.log('<load:%s>', url);
		}, function(){
			console.log('<go:%s>', url);
		});
		// scope.app.request(url);
		evt.preventDefault();
	};

	Folder.prototype.resize = function(evt){
		console.log('Folder->resized:', evt);
	};

	function route(path, fn) {
		console.log(this.caller);
		// if(typeof path === 'function'){
		// 	return route('*', path);
		// }
		// if(typeof fn === 'function'){
		// 	console.log('<middleware:%s>', path);
		// }else if(typeof path === 'string'){
		// 	route[typeof fn === 'string' ? 'redirect' : 'show'](path, fn);
		// }else{
		// 	route.start(path);
		// }
	}

	route.start = function(opts){
		console.log('<start:%s>', path);
	};

	route.redirect = function(path, fn){
		console.log('<redirect:%s>', path);
	};

	route.show = function(path, fn){
		console.log('<show:%s>', path);
	};

	return scope.uri('folder.Main', Folder);
});