/* global ambox */
var chalk = require('chalk');
var ResponseFile = require('../files/ResponseFile');

var ContactCtrl = function(model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = model;
};

ContactCtrl.prototype.index = function(request, response){
	response.render('pages/contact', this.defaults);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ContactCtrl.prototype.create = function(request, response){
	response.render('pages/contact', this.defaults);
};

module.exports = ambox.uri('controllers.ContactCtrl', ContactCtrl);