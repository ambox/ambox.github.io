define(function(){

	var ls = function(path){
		var objectAssessor = /\[(["']?)([^\1]+?)\1?\]/g;
		var keys = path.replace(objectAssessor, '.$2');
		keys = keys.replace(/^\./, '');
		return keys.split('.');
	};

	var write = function(target, path, value){
		var id = 0;
		var keys = ls(path);
		var total = keys.length - 1;
		var isLikeObject;
		while(id < total){
			path = keys[id++];
			isLikeObject = target[path] === Object(target[path]);
			target = target[path] = isLikeObject? target[path]:{};
		}
		if(typeof(value) === 'undefined'){
			delete(target[keys[id]]);
		}else{
			target[keys[id]] = value;
		}
		return value;
	};
	
	var read = function(target, path){
		var id = 0;
		var keys = ls(path);
		var total = keys.length;
		while((target = target[keys[id++]]) && id < total){}
		return id < total? void(0) : target;
	};

	var stub = function(target, namespace){
		target = target[namespace] = target[namespace] || {};
		target.namespace = namespace;
		target.ls = ls;
		target.uri = function(key, value){
			var hasValue = arguments.length > 1;
			return hasValue? write(target, key, value) : read(target, key);
		};
		return target;
	};

	return stub(this, 'Ad');
});