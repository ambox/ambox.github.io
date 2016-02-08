/* global ambox */
var assert = require('assert')

var ArchivesModel = function(){
	this.archives = ambox.database.collection('archives')
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesModel.prototype.create = function(data, callback){
	// return this.archives.insert(data, {}, callback)
}

ArchivesModel.prototype.findOne = function(uid, callback){
	// return this.archives.findOne({ _id:mongo.ObjectId(uid) }, callback)
}

ArchivesModel.prototype.updateOne = function(uid, data, callback){
	// return this.archives.update(data, callback)
}

ArchivesModel.prototype.deleteOne = function(uid, callback){
	// return this.archives.remove({ _id:uid }, callback)
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesModel.prototype.findAll = function(callback){
	// return this.archives.find({}, callback)
}

ArchivesModel.prototype.updateAll = function(data, callback){
	// return this.archives.update(data, callback)
}

ArchivesModel.prototype.deleteAll = function(callback){
	// return this.archives.remove({}, callback)
}

module.exports = ambox.uri('models.ArchivesCtrl', ArchivesModel)