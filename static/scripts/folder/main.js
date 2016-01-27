define(['scope', 'jquery'], function(scope, $){

	function Folder(){
		this.startup = this.startup.bind(this);
		this.resize = this.resize.bind(this);
		this.onUserInteract = this.onUserInteract.bind(this);
		this.onPopState = this.onPopState.bind(this);
		this.loadView = this.loadView.bind(this);
		this.onLoadView = this.onLoadView.bind(this);
	}

	Folder.prototype.startup = function(){
		$('body').on('click', '[ui-sref]', this.onUserInteract);
		$(window).on('popstate', this.onPopState);
	};

	Folder.prototype.onUserInteract = function(evt){
		evt.preventDefault();
		var state = $(evt.currentTarget).attr('href');
		if(state.indexOf(document.domain) > -1 || state.indexOf(':') === -1){
			history.pushState({}, '', state);
			this.loadView(state);
			return false;
		}
	};
	
	Folder.prototype.onPopState = function(evt){
		if(evt.originalEvent.state !== null){
			this.loadView(window.location.href);
		}
	};
	
	Folder.prototype.loadView = function(url){
		console.log('[ui-sref]:', url);
		$.getJSON(url, { format:'json' }, this.onLoadView);
	};
	
	Folder.prototype.onLoadView = function(view){
		console.log('[ui-view]:', view);
		// view.html = $(view.html).find('[ui-view]').html();
		// $('[ui-view]').html(view.html);
	};
	
	Folder.prototype.resize = function(evt){
		console.log('Folder->resized:', evt);
	};

	return scope.uri('folder.Main', Folder);
});