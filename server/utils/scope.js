'use strict';

var ls = exports.ls = function(path){
	var objectAssessor = /\[(["']?)([^\1]+?)\1?\]/g;
	var keys = path.replace(objectAssessor, '.$2');
	keys = keys.replace(/^\./, '');
	return keys.split('.');
};

var write = exports.write = function(target, path, value){
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
};

var read = exports.read = function(target, path){
	var id = 0;
	var keys = ls(path);
	var total = keys.length;
	while((target = target[keys[id++]]) !== null && id < total){}
	return id < total? void(0) : target;
};

var stub = exports.stub = function(target, namespace){
	target = target[namespace] = target[namespace] || {};
	target.namespace = namespace;
	target.ls = ls;
	target.uri = function(key, value){
		value? write(target, key, value) : read(target, key);
		return value;
	};
	return target;
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