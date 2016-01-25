var ls = exports.ls = function(path){
	var objectAssessor = /\[(["']?)([^\1]+?)\1?\]/g;
	var keys = path.replace(objectAssessor, '.$2');
	keys = keys.replace(/^\./, '');
	return keys.split('.');
};

var merge = exports.merge = function(target){
	var params = Array.prototype.slice.call(arguments);
	var id, source, property;
	for(id = 1; id < params.length; id++){
		source = params[id];
		for(var property in source){
			if(Object.prototype.hasOwnProperty.call(source, property)){
				target[property] = source[property];
			}
		}
	}
	return target;
};

var write = exports.write = function(target, path, value, overwrite){
	var id = 0;
	var keys = ls(path);
	var total = keys.length - 1;
	var isLikeObject;
	while(id < total){
		path = keys[id++];
		isLikeObject = target[path] === Object(target[path]);
		target = target[path] = isLikeObject? target[path]:{};
	}
	path = keys[id];
	if(typeof(value) === 'undefined'){
		overwrite && delete(target[path]);
	}else{
		value = overwrite? value : target[path] || value;
		target[path] = value;
	}
	return value;
};

var read = exports.read = function(target, path){
	var id = 0;
	var keys = ls(path);
	var total = keys.length;
	while((target = target[keys[id++]]) && id < total){}
	return id < total? void(0) : target;
};

var stub = exports.stub = function(target, namespace){
	target = target[namespace] = target[namespace] || {};
	target.namespace = namespace;
	target.merge = merge;
	target.stub = stub;
	target.ls = ls;
	target.uri = function(key, value, overwrite){
		var hasValue = arguments.length > 1;
		overwrite = value && typeof overwrite === 'undefined'? true : !!overwrite;
		return hasValue? write(target, key, value, overwrite) : read(target, key);
	};
	return target;
};