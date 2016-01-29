/* global ambox */
var chalk = require('chalk');
var ResponseFile = require('../files/ResponseFile');

var ArchivesCtrl = function(model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = model;
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
	var data = request.body;
	// this.model.create(data).then(function(value){}).catch(function(reason){});
	response.render('pages/archives', this.defaults);
};

ArchivesCtrl.prototype.findOne = function(request, response){
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	// this.model.findOne(uid).then(function(value){}).catch(function(reason){});
	console.log('[ArchivesCtrl.findOne.format]:', format);
	console.log('[ArchivesCtrl.findOne.uid]:', uid);
};

ArchivesCtrl.prototype.updateOne = function(request, response){
	var data = request.body;
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	// this.model.updateOne(uid, data).then(function(value){}).catch(function(reason){});
	console.log('[ArchivesCtrl.updateOne.format]:', format);
	console.log('[ArchivesCtrl.updateOne.uid]:', uid);
};

ArchivesCtrl.prototype.deleteOne = function(request, response){
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	// this.model.deleteOne(uid).then(function(value){}).catch(function(reason){});
	console.log('[ArchivesCtrl.deleteOne.format]:', format);
	console.log('[ArchivesCtrl.deleteOne.uid]:', uid);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesCtrl.prototype.findAll = function(request, response){
	var format = request.params.format || 'json';
	// this.model.findAll().then(function(value){}).catch(function(reason){});
	console.log('[ArchivesCtrl.findAll.format]:', format);
};

ArchivesCtrl.prototype.updateAll = function(request, response){
	var data = request.body;
	var format = request.params.format || 'json';
	// this.model.updateAll(data).then(function(value){}).catch(function(reason){});
	console.log('[ArchivesCtrl.updateAll.format]:', format);
};

ArchivesCtrl.prototype.deleteAll = function(request, response){
	var format = request.params.format || 'json';
	// this.model.deleteAll().then(function(value){}).catch(function(reason){});
	console.log('[ArchivesCtrl.deleteAll.format]:', format);
};

module.exports = ambox.uri('controllers.ArchivesCtrl', ArchivesCtrl);