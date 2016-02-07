/* global ambox */
var chalk = require('chalk');
var ResponseFile = require('../files/ResponseFile');

var FluxCtrl = function(model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = model;
};

FluxCtrl.prototype.index = function(request, response){
	response.render('pages/flux', this.defaults);
};

FluxCtrl.prototype.new = function(request, response){
	response.render('partials/flux/new', this.defaults);
};

FluxCtrl.prototype.edit = function(request, response){
	response.render('partials/flux/edit', this.defaults);
};

FluxCtrl.prototype.show = function(request, response){
	response.render('partials/flux/show', this.defaults);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FluxCtrl.prototype.create = function(request, response){
	console.log('[FluxCtrl.create]');
};

FluxCtrl.prototype.findOne = function(request, response){
	console.log('[FluxCtrl.findOne]<format:%s, uid:%s>:', request.params.format, request.params.uid);
};

FluxCtrl.prototype.updateOne = function(request, response){
	console.log('[FluxCtrl.updateOne]<format:%s, uid:%s>:', request.params.format, request.params.uid);
};

FluxCtrl.prototype.deleteOne = function(request, response){
	console.log('[FluxCtrl.deleteOne]<format:%s, uid:%s>:', request.params.format, request.params.uid);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FluxCtrl.prototype.findAll = function(request, response){
	console.log('[FluxCtrl.findAll]:', this.model);
	response.render('pages/flux', this.defaults);
};

FluxCtrl.prototype.updateAll = function(request, response){
	console.log('[FluxCtrl.updateAll.format]:', request.params.format);
};

FluxCtrl.prototype.deleteAll = function(request, response){
	console.log('[FluxCtrl.deleteAll.format]:', request.params.format);
};

module.exports = ambox.uri('controllers.FluxCtrl', FluxCtrl);