define(['scope', 'jquery', 'folder/urls'], function(scope, $){

	function Folder(){
		scope.bindAll(this);
	}

	Folder.prototype.startup = function(){
		scope.urls.start();
	};
	
	Folder.prototype.resize = function(evt){
		console.log('Folder->resized:', evt);
	};

	return scope.uri('folder.Main', Folder);
});