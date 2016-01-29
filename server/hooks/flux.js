/* global ambox */
var chalk = require('chalk');
var ResponseFile = require('../files/ResponseFile');

var FluxCtrl = function(Model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = Model;
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
	response.render('pages/flux', this.defaults);
};

FluxCtrl.prototype.findOne = function(request, response){
	console.log('[FluxCtrl.findOne.format]:', request.params.format);
	console.log('[FluxCtrl.findOne.uid]:', request.params.uid);
};

FluxCtrl.prototype.updateOne = function(request, response){
	console.log('[FluxCtrl.updateOne.format]:', request.params.format);
	console.log('[FluxCtrl.updateOne.uid]:', request.params.uid);
};

FluxCtrl.prototype.deleteOne = function(request, response){
	console.log('[FluxCtrl.deleteOne.format]:', request.params.format);
	console.log('[FluxCtrl.deleteOne.uid]:', request.params.uid);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FluxCtrl.prototype.findAll = function(request, response){
	console.log('[FluxCtrl.findAll.format]:', request.params.format);
};

FluxCtrl.prototype.updateAll = function(request, response){
	console.log('[FluxCtrl.updateAll.format]:', request.params.format);
};

FluxCtrl.prototype.deleteAll = function(request, response){
	console.log('[FluxCtrl.deleteAll.format]:', request.params.format);
};

module.exports = ambox.uri('controllers.FluxCtrl', FluxCtrl);