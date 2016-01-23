'use strict';

var File = require('./File');
var EnvFile = function(url, options){
	var file = new File(url, options);
	this.variables = {};
	this.text = file.readSync();
	this.lines = file.lines;
	file.lines.filter(function(line){
		return /\s*=\s*/i.test(line);
	}).forEach(function(line, match, key, val){
		line = line.replace(/exports(\s)+/, '');
		match = line.match(/^([^=]+)\s*=\s*(.*)$/) || ['','',''];
		key = match[1];
		val = match[2].match(/^(['"]?)([^\n]*)\1$/m)[2];
		if(key && val){
			this.variables[key] = val;
		}
	}.bind(this));
};

EnvFile.prototype.eachVar = function(iterator, context){
	for(var key in this.variables){
		if(this.variables.hasOwnProperty(key)){
			iterator.call(context||this.variables, this.variables[key], key);
		}
	}
};

EnvFile.prototype.eachLine = function(iterator, context){
	for(var id = 0, total = this.lines.length; id < total; id++){
		iterator.call(context||this.lines, this.lines[id], id);
	}
};

module.exports = EnvFile;