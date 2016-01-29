/* global ambox */
var ResponseFile = function(options){
	ambox.bindAll(this, 'default', 'text/html', 'application/json', 'text/javascript');
	this.options = ambox.merge({}, ResponseFile.defaults, options);
	this.output = this.options.response;
};

ResponseFile.defaults = {
	output:null,
	templateUrl:'',
	data:{},
	jsonp:{},
	json:{},
	html:'',
	text:''
};

ResponseFile.prototype['text/javascript'] = function(){
	this.output.jsonp(this.options.json);
};

ResponseFile.prototype['application/json'] = function(){
	this.output.json(this.options.json);
};

ResponseFile.prototype['text/html'] = function(){
	this.output.render(this.options.templateUrl, this.options.data);
};

ResponseFile.prototype['text/plain'] = function(){
	this.output.send(this.options.text);
};

ResponseFile.prototype.default = function(){
	this.output.status(406).send('Not Acceptable');
};

module.exports = ambox.uri('files.ResponseFile', ResponseFile);