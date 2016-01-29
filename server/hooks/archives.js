/* global ambox */
var chalk = require('chalk');
var ResponseFile = require('../files/ResponseFile');

var ArchivesCtrl = function(Model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = Model;
};

ArchivesCtrl.prototype.index = function(request, response){
	response.render('pages/archives', this.defaults);
};

ArchivesCtrl.prototype.new = function(request, response){
	response.render('partials/archives/new', this.defaults);
};

ArchivesCtrl.prototype.edit = function(request, response){
	response.render('partials/archives/edit', this.defaults);
};

ArchivesCtrl.prototype.show = function(request, response){
	response.render('partials/archives/show', this.defaults);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesCtrl.prototype.create = function(request, response){
	response.render('pages/archives', this.defaults);
};

ArchivesCtrl.prototype.findOne = function(request, response){
	console.log('[ArchivesCtrl.findOne.format]:', request.params.format);
	console.log('[ArchivesCtrl.findOne.uid]:', request.params.uid);
};

ArchivesCtrl.prototype.updateOne = function(request, response){
	console.log('[ArchivesCtrl.updateOne.format]:', request.params.format);
	console.log('[ArchivesCtrl.updateOne.uid]:', request.params.uid);
};

ArchivesCtrl.prototype.deleteOne = function(request, response){
	console.log('[ArchivesCtrl.deleteOne.format]:', request.params.format);
	console.log('[ArchivesCtrl.deleteOne.uid]:', request.params.uid);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesCtrl.prototype.findAll = function(request, response){
	console.log('[ArchivesCtrl.findAll.format]:', request.params.format);
};

ArchivesCtrl.prototype.updateAll = function(request, response){
	console.log('[ArchivesCtrl.updateAll.format]:', request.params.format);
};

ArchivesCtrl.prototype.deleteAll = function(request, response){
	console.log('[ArchivesCtrl.deleteAll.format]:', request.params.format);
};

module.exports = ambox.uri('controllers.ArchivesCtrl', ArchivesCtrl);