/* global ambox */
var mongo = require('../db/mongo');
var Promise = require('bluebird');

var ArchivesModel = function(){
	Promise.promisifyAll(this);
	this.archives = mongo.collection('archives');
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesModel.prototype.create = function(data, callback){
	this.archives.save(data, callback);
};

ArchivesModel.prototype.findOne = function(uid, callback){
	this.archives.findOne({ _id:mongo.ObjectId(uid) }, callback);
};

ArchivesModel.prototype.updateOne = function(uid, data, callback){
	// this.archives.update(data, callback);
};

ArchivesModel.prototype.deleteOne = function(uid, callback){
	this.archives.remove({ _id:uid }, callback);
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesModel.prototype.findAll = function(callback){
	this.archives.find({}, callback);
};

ArchivesModel.prototype.updateAll = function(data, callback){
	// this.archives.update(data, callback);
};

ArchivesModel.prototype.deleteAll = function(callback){
	// this.archives.remove({}, callback);
};

module.exports = ambox.uri('models.ArchivesCtrl', ArchivesModel);