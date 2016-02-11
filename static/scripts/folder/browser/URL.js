define(['scope'], function(scope){

	var el = document.createElement('a');

	function URL(value){
		var params = {};
		var defaultPorts = { http:80, https:443, ftp:21 };
		el.setAttribute('href', URL.normalize(value));
		this.pathname = (el.pathname.charAt(0) === '/')? el.pathname:'/'+ el.pathname;
		this.protocol = el.protocol? el.protocol.replace(/\:$/, '') : '';
		this.search = el.search? el.search.replace(/^\?/, '') : '';
		this.hash = el.hash? el.hash.replace(/^\#/, '') : '';
		this.port = window.parseInt(el.port) || defaultPorts[this.protocol] || null;
		this.password = el.password;
		this.username = el.username;
		this.hostname = el.hostname;
		this.origin = el.origin;
		this.host = el.host;
		this.href = el.href;
		this.params = params;
		this.search.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3){
			params[$1] = $3;
		});
	}

	URL.normalize = function(value){
		if(document.documentMode){
			el.setAttribute('href', value);
			value = el.href;
		}
		return value;
	};

	URL.pathRegexp = function(path, opts){
		path = new URL(path).pathname;
		opts = scope.merge({}, opts);
		var flags = opts.sensitive ? '' : 'i';
		path = path.replace(/[\-{}\[\]+?.,\\\^$|#\s]/g, '\\$&');
		path = path.replace(/\((.*?)\)/g, '(?:$1)?');
		path = path.replace(/(\(\?)?:\w+/g, function(match, optional){
			return optional? match : '([^/?]+)';
		}).replace(/\*\w+/g, '([^?]*?)');
		return new RegExp('^'+ path +'(?:\\?([\\s\\S]*))?$', flags);
	};

	return scope.uri('folder.browser.URL', URL);
});