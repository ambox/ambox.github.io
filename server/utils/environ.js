var fs = require('fs');
var path = require('path');
var assert = require('assert');
var EnvFile = require('./envfile');

var environ = function(filePath, overwrite){
	environ.load(filePath, overwrite);
};

environ.load = function(filePath, overwrite){
	var file = new EnvFile(filePath);
	file.eachVar(function(value, key){
		environ.set(key, value, overwrite);
	});
	return file;
};

environ.set = function(variable, value, overwrite){
	value = overwrite? value : environ.get(variable, value);
	process.env[variable] = value;
	return process.env[variable];
};

environ.get = function(variable, defaultValue){
	return process.env[variable] || defaultValue || variable;
};

module.exports = environ;