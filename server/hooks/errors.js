/* global ambox */
var chalk = require('chalk');
var ResponseFile = require('../files/ResponseFile');

var ErrorsCtrl = function(model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = model;
};

ErrorsCtrl.prototype.notFound = function(request, response){
	response.status(404).render('server/404', this.defaults);
};

ErrorsCtrl.prototype.badRequest = function(request, response){
	response.status(500).render('server/500', this.defaults);
};

module.exports = ambox.uri('controllers.ErrorsCtrl', ErrorsCtrl);