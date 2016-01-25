/* global ambox, process */
var fs = require('fs');
var path = require('path');
var EnvFile = require('../files/EnvFile');

var environ = function(filePath, overwrite){
	environ.load(filePath, overwrite);
};

environ.load = function(filePath, options){
	options = ambox.merge({}, options);
	var file = new EnvFile(filePath, options);
	file.eachVar(function(value, key){
		environ.set(key, value, options.overwrite);
	});
	return file;
};

environ.set = function(variable, value, overwrite){
	value = overwrite? value : environ.get(variable, value);
	process.env[variable] = JSON.stringify(value);
	return process.env[variable];
};

environ.get = function(variable, defaultValue){
	return process.env[variable] || defaultValue;
};

module.exports = ambox.uri('utils.environ', environ);