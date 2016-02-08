/* global ambox */
var chalk = require('chalk');
var View = require('../files/View');
var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');

var ContactCtrl = function(model, defaults){
	ambox.bindAll(this);
	this.defaults = defaults;
	this.model = model;
};

ContactCtrl.prototype.index = function(request, response){
	View.render('pages/contact', request, response, this.defaults);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ContactCtrl.prototype.create = function(request, response){
	View.render('pages/contact', request, response, this.defaults);
};

module.exports = ambox.uri('controllers.ContactCtrl', ContactCtrl);