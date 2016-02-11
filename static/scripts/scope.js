define(function(){

	var browse = function(fn){
		return function(){
			return Function.call.apply(fn, arguments);
		};
	};

	var hasOwnProp = browse(Object.prototype.hasOwnProperty);
	var toString = browse(Object.prototype.toString);
	var slice = browse(Array.prototype.slice);

	var keys = function(object, getEnum){
		var properties = [];
		for(var key in object){
			if(getEnum || hasOwnProp(object, key)){
				properties.push(key);
			}
		}
		return properties;
	};

	var flatten = function(list){
		if(!Array.isArray(list))return [];
		return list.reduce(function(a, b){
			return a.concat(b);
		}, []);
	};

	var ls = function(path){
		var objectAssessor = /\[(["']?)([^\1]+?)\1?\]/g;
		var keys = path.replace(objectAssessor, '.$2');
		keys = keys.replace(/^\./, '');
		return keys.split('.');
	};

	var merge = function(target){
		var params = slice(arguments);
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

	var pick = function(object){
		var hash = {};
		var properties = slice(arguments, 1);
		for(var id = 0, total = properties.length; id < total; id++){
			if(object === Object(object) && properties[id]){
				hash[properties[id]] = object[properties[id]];
			}
		}
		return hash;
	};

	var bind = function(fn, context){
		var args = slice(arguments, 2);
		var proxy = function(){
			return fn.apply(context, args.concat(slice(arguments)));
		};
		proxy.__originalFn__ = proxy.__originalFn__ || fn;
		return proxy;
	};

	var unbind = function(fn, context){
		var originalFn = fn.__originalFn__;
		delete(fn.__originalFn__);
		return originalFn;
	};

	var bindAll = function(context, methods){
		methods = Array.isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = bind(context[methods[id]], context);
			}
		}
		return context;
	};

	var unbindAll = function(context, methods){
		methods = Array.isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = unbind(context[methods[id]], context);
			}
		}
		return context;
	};

	var write = function(target, path, value, overwrite){
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

	var read = function(target, path){
		var id = 0;
		var keys = ls(path);
		var total = keys.length;
		while((target = target[keys[id++]]) && id < total){}
		return id < total? void(0) : target;
	};

	var stub = function(target, namespace){
		target = target[namespace] = target[namespace] || {};
		target.hasOwnProp = hasOwnProp;
		target.namespace = namespace;
		target.unbindAll = unbindAll;
		target.toString = toString;
		target.flatten = flatten;
		target.bindAll = bindAll;
		target.unbind = unbind;
		target.browse = browse;
		target.slice = slice;
		target.bind = bind;
		target.merge = merge;
		target.stub = stub;
		target.pick = pick;
		target.ls = ls;
		target.uri = function(key, value, overwrite){
			var hasValue = arguments.length > 1;
			overwrite = value && typeof overwrite === 'undefined'? true : !!overwrite;
			return hasValue? write(target, key, value, overwrite) : read(target, key);
		};
		return target;
	};

	return stub(this, 'Ambox');
});