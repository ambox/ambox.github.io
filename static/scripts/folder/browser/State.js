define(['scope'], function(scope){

	State.POP = 'hashchange';

	function Hash(bang){
		this.bang = !!bang? '!' : '';
	}

	Hash.prototype.parse = function(state, title, path){
		this.url = new URL(path);
		this.state = scope.merge({ url:this.url }, state);
		this.title = typeof title === 'string'? title : document.title;
		return 1;
	};

	Hash.prototype.push = function(state, title, path){
		this.parse(state, title, path);
		// this.state // dispatch (location.href.split('#'+this.bang)[1] || this.url.hash);
		document.title = this.title;
		location.hash = this.bang + this.url.pathname;
	};

	Hash.prototype.replace = function(state, title, path){
		this.push(state, title, this.bang + path);
	};

	State.POP = 'popstate';
	State.exists = 'pushState' in window.history;

	function State(){
		this.parse('/', { pop:true }, document.title);
	}

	State.prototype.parse = function(state, title, path){
		if(!State.exists)return 0;
		this.url = new URL(path);
		this.state = scope.merge({ url:this.url }, state);
		this.title = typeof title === 'string'? title : document.title;
		return 1;
	};

	State.prototype.push = function(state, title, path){
		if(this.parse(state, title, path)){
			// this.state // dispatch parsed (evt.state.path)
			window.history.pushState(this.state, this.title, this.url.pathname);
		}
	};

	State.prototype.replace = function(state, title, path){
		if(this.parse(state, title, path)){
			// this.state // dispatch parsed (evt.state.path)
			window.history.replaceState(this.state, this.title, this.url.pathname);
		}
	};

	return scope.uri('folder.browser.State', new State());
});