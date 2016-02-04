/* global ambox */
var $ = require('jquery');
var dom = require('jsdom').env;
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
	console.log('[ArchivesCtrl.create.data]:', data);
	// this.model.create(data).then(ResponseFile.renderResult(
	// 	request, response
	// )).catch(ResponseFile.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.findOne = function(request, response){
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.findOne.format]:', format);
	console.log('[ArchivesCtrl.findOne.uid]:', uid);
	// this.model.findOne(uid).then(ResponseFile.renderResult(
	// 	request, response
	// )).catch(ResponseFile.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.updateOne = function(request, response){
	var data = request.body;
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.updateOne.format]:', format);
	console.log('[ArchivesCtrl.updateOne.data]:', data);
	console.log('[ArchivesCtrl.updateOne.uid]:', uid);
	// this.model.updateOne(uid, data).then(ResponseFile.renderResult(
	// 	request, response
	// )).catch(ResponseFile.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.deleteOne = function(request, response){
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.deleteOne.format]:', format);
	console.log('[ArchivesCtrl.deleteOne.uid]:', uid);
	// this.model.deleteOne(uid).then(ResponseFile.renderResult(
	// 	request, response
	// )).catch(ResponseFile.renderFault(
	// 	request, response
	// ));
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesCtrl.prototype.findAll = function(request, response){
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.findAll.format]:', format);
	// this.model.findAll().then(ResponseFile.renderResult(
	// 	request, response
	// )).catch(ResponseFile.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.updateAll = function(request, response){
	var data = request.body;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.updateAll.format]:', format);
	console.log('[ArchivesCtrl.updateAll.data]:', data);
	// this.model.updateAll(data).then(ResponseFile.renderResult(
	// 	request, response
	// )).catch(ResponseFile.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.deleteAll = function(request, response){
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.deleteAll.format]:', format);
	// this.model.deleteAll().then(ResponseFile.renderResult(
	// 	request, response
	// )).catch(ResponseFile.renderFault(
	// 	request, response
	// ));
};

module.exports = ambox.uri('controllers.ArchivesCtrl', ArchivesCtrl);