define(['scope', 'folder/browser/History'], function(scope, History){

	function urls(target){
		this.links = target;
	}

	urls.prototype['/'] = function(){};
	urls.prototype['/flux'] = function(){};
	urls.prototype['/flux/new'] = function(){};
	urls.prototype['/flux/:uid'] = function(uid){};
	urls.prototype['/flux/:uid/edit'] = function(uid){};
	urls.prototype['/archives/new'] = function(){}
	urls.prototype['/archives/:uid'] = function(uid){};
	urls.prototype['/archives/:uid/edit'] = function(uid){};
	urls.prototype['/contact'] = function(){};
	urls.prototype['/404'] = function(){};

	var history = new History(new urls('[ui-sref]'));
	return scope.uri('urls', history);
});