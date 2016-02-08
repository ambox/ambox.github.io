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





	var XHR = (function(){
		var module = {};
		module._init = function () {
			return new XMLHttpRequest();
		};
		module._onReady = function (xmlhttp, cb) {
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
					cb(xmlhttp.responseText);
				}
			};
		};
		module._setHeaders = function (xmlhttp) {
			xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xmlhttp.setRequestHeader('Accept', 'text/plain');
			xmlhttp.setRequestHeader('Content-Type', 'text/plain');
		};
		module.get = function (url, cb) {
			var xmlhttp = module._init();

			xmlhttp.open('GET', url, true);
			module._setHeaders(xmlhttp);
			xmlhttp.send(null);

			module._onReady(xmlhttp, cb);
		};
		module.post = function (url, data, cb) {
			var xmlhttp = module._init();

			xmlhttp.open('POST', url, true);
			module._setHeaders(xmlhttp);
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xmlhttp.send(data);

			module._onReady(xmlhttp, cb);
		};
		return {
			get: module.get,
			post: module.post
		}
	}());

	var $navAs = scope.slice(document.querySelectorAll('[href^="/"]'));
	var $content = document.querySelector('[ui-view]');

	function getPage(evt){
		var $this = this;
		var href = $this.getAttribute('href');
		evt.preventDefault();
		XHR.get(href, function(data){
			var json = JSON.parse(data);
			$content.innerHTML = json.content;
			history.pushState(href, json.title, href);
			document.title = json.title;
			document.querySelector('meta[name="description"]').setAttribute('content', json.description);
			document.querySelector('link[rel="canonical"]').setAttribute('href', json.canonical);
		});
	}

	$navAs.forEach(function($a){
		$a.addEventListener('click', getPage);
	});

	window.addEventListener('popstate', function(evt){
		console.log('[popstate]:', evt);
	});

	return scope.uri('folder.Main', Folder);
});