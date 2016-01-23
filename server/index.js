/* global ambox */
var express = require('express');
var chalk = require('chalk');

var Server = function(options){
	this.options = ambox.merge({}, options);
};

Server.create = function(options){
	return new Server(options);
};

Server.prototype.init = function(database){
};

Server.prototype.start = function(callback){
};

module.exports = ambox.uri('Server', Server);