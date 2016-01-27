define(['scope', 'jquery'], function(scope, $){

	function Folder(){
		this.startup = this.startup.bind(this);
		this.resize = this.resize.bind(this);
		this.onUserInteract = this.onUserInteract.bind(this);
		this.onPopState = this.onPopState.bind(this);
		this.loadPage = this.loadPage.bind(this);
		this.onLoadPage = this.onLoadPage.bind(this);
	}

	Folder.prototype.startup = function(){
		$('body').on('click', '[ui-sref]', this.onUserInteract);
		$(window).on('popstate', this.onPopState);
	};

	Folder.prototype.onUserInteract = function(evt){
		var state = $(evt.currentTarget).attr('ui-sref');
		if(state.indexOf(document.domain) > -1 || state.indexOf(':') === -1){
			history.pushState({}, '', state);
			this.loadPage(state);
			return false;
		}
	};
	
	Folder.prototype.onPopState = function(evt){
		if(evt.originalEvent.state !== null){
			this.loadPage(window.location.href);
		}
	};
	
	Folder.prototype.loadPage = function(url){
		console.log('[ui-sref]:', url);
		$.get(url, this.onLoadPage);
	};
	
	Folder.prototype.onLoadPage = function(html){
		console.log('[ui-view]:', html);
		$('[ui-view]').html(html);
	};
	
	Folder.prototype.resize = function(evt){
		console.log('Folder->resized:', evt);
	};

	return scope.uri('folder.Main', Folder);
});