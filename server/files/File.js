/* global ambox */
var fs = require('fs');
var path = require('path');

var File = function(url, options){
	this.options = ambox.merge({}, options);
	this.url = this.url(url);
	this.lines = [];
};

File.prototype.readSync = function(){
	if(fs.existsSync(this.url)){
		try{
			var file = fs.readFileSync(this.url, 'utf8') || '';
			this.lines = file.split(/\r?\n|\r/g);
			return file;
		}catch(error){
			console.warn('[File '+ error.stack +'\n]');
		}
	}else{
		console.warn('[File '+ this.url +' does not exists.]');
	}
	return '';
};

File.prototype.eachLine = function(iterator, context){
	for(var id = 0, total = this.lines.length; id < total; id++){
		iterator.call(context||this.lines, this.lines[id], id);
	}
};

File.prototype.url = function(url){
	try{
		return path.resolve(url);
	}catch(error){
		console.warn('[File '+ error.stack +'\n]');
		return '';
	}
};

module.exports = ambox.uri('files.File', File);