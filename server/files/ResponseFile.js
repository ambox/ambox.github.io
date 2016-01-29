/* global ambox */
var ResponseFile = function(request, response, options){
	ambox.bindAll(this);
	this.options = ambox.merge({}, options);
	this.output = response;
	this.input = request;
};

ResponseFile.renderResult = function(request, response, options){
	options = ambox.merge({}, options);
	return function(value){
		response.format(new ResponseFile(request, response, {
			error:{ responseCode:406, message:'Not Acceptable', code:0, moreInfo:'http://' },
			templateUrl:options.templateUrl,
			data:options.data,
			jsonp:value,
			json:value,
			html:value,
			text:value,
			xml:value,
			image:value
		}));
	};
};


ResponseFile.renderFault = function(request, response, options){
	options = ambox.merge({}, options);
	return function(reason){
		console.error(reason);
	};
};

ArchivesCtrl.prototype.generateFault = function(request, response){
	return function(reason){
	};
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