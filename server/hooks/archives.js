/* global ambox */
var chalk = require('chalk');
var View = require('../files/View');

var ArchivesCtrl = function(model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = model;
};

ArchivesCtrl.prototype.index = function(request, response){
	View.render('pages/archives', request, response, this.defaults);
};

ArchivesCtrl.prototype.new = function(request, response){
	View.render('partials/archives/new', request, response, this.defaults);
};

ArchivesCtrl.prototype.edit = function(request, response){
	View.render('partials/archives/edit', request, response, this.defaults);
};

ArchivesCtrl.prototype.show = function(request, response){
	View.render('partials/archives/show', request, response, this.defaults);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesCtrl.prototype.create = function(request, response){
	var data = request.body;
	console.log('[ArchivesCtrl.create.data]:', data);
	// this.model.create(data).then(View.renderResult(
	// 	request, response
	// )).catch(View.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.findOne = function(request, response){
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.findOne]<format:%s, uid:%s>:', format, uid);
	// this.model.findOne(uid).then(View.renderResult(
	// 	request, response
	// )).catch(View.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.updateOne = function(request, response){
	var data = request.body;
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.updateOne]<format:%s, data:%s, uid:%s>:', format, data, uid);
	// this.model.updateOne(uid, data).then(View.renderResult(
	// 	request, response
	// )).catch(View.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.deleteOne = function(request, response){
	var uid = request.params.uid;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.deleteOne]<format:%s, uid:%s>:', format, uid);
	// this.model.deleteOne(uid).then(View.renderResult(
	// 	request, response
	// )).catch(View.renderFault(
	// 	request, response
	// ));
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesCtrl.prototype.findAll = function(request, response){
	var format = request.params.format || 'json';
	View.render('pages/archives', request, response, this.defaults);
	// this.model.findAll().then(View.renderResult(
	// 	request, response
	// )).catch(View.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.updateAll = function(request, response){
	var data = request.body;
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.updateAll]<format:%s, data:%s>:', format, data);
	// this.model.updateAll(data).then(View.renderResult(
	// 	request, response
	// )).catch(View.renderFault(
	// 	request, response
	// ));
};

ArchivesCtrl.prototype.deleteAll = function(request, response){
	var format = request.params.format || 'json';
	console.log('[ArchivesCtrl.deleteAll.format]:', format);
	// this.model.deleteAll().then(View.renderResult(
	// 	request, response
	// )).catch(View.renderFault(
	// 	request, response
	// ));
};

module.exports = ambox.uri('controllers.ArchivesCtrl', ArchivesCtrl);