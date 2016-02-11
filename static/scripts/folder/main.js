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
		scope.app.request(url);
		evt.preventDefault();
	};

	Folder.prototype.resize = function(evt){
		console.log('Folder->resized:', evt);
	};

	return scope.uri('folder.Main', Folder);
});