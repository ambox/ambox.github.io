/* global ambox */
var ResponseFile = function(response, options){
	ambox.bindAll(this);
	this.options = ambox.merge({}, ResponseFile.defaults, options);
	this.options.error = ambox.merge({}, ResponseFile.defaults.error, this.options.error);
	this.output = response;
};

ResponseFile.defaults = {
	error:{ responseCode:406, message:'Not Acceptable', code:0, moreInfo:'http://' },
	templateUrl:'',
	params:{},
	data:{},
	jsonp:{},
	json:{},
	html:'',
	text:'',
	xml:'',
	image:''
};

ResponseFile.prototype.image = function(){console.log('format.image');
	this.output.send(this.options.image);
};

ResponseFile.prototype.xml = function(){console.log('format.xml');
	this.output.send(this.options.xml);
};

ResponseFile.prototype.html = function(){console.log('format.html');
	this.output.render(this.options.templateUrl, this.options.data);
};

ResponseFile.prototype.text = function(){console.log('format.text');
	this.output.send(this.options.text);
};

ResponseFile.prototype.json = function(){console.log('format.json');
	this.output.json(this.options.json);
};

ResponseFile.prototype.jsonp = function(){console.log('format.jsonp');
	this.output.jsonp(this.options.json);
};

ResponseFile.prototype.default = function(){
	this.output.status(406).send('Not Acceptable');
};

module.exports = ambox.uri('files.ResponseFile', ResponseFile);