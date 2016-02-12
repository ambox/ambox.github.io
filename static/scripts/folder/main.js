define(['scope', 'jquery', './urls'], function(scope, $){

	function Folder(){
		scope.bindAll(this);
	}

	Folder.prototype.startup = function(){
		this.app = new scope.folder.Router();
		$('body').on('click', '[ui-sref]', this.onClickSRef);
		this.app.start();
	};

	Folder.prototype.onClickSRef = function(evt){
		var $target = $(evt.currentTarget);
		var uri = $target.attr('ui-sref');
		this.app.request(uri);
		evt.preventDefault();
	};

	Folder.prototype.resize = function(evt){
		console.log('Folder->resized:', evt);
	};

	return scope.uri('folder.Main', Folder);
});