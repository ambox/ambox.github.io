/* global ambox */
var mongo = require('../db/mongo');

var ArchivesModel = function(){
	this.archives = mongo.collection('archives');
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Single requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesModel.prototype.create = function(data){
	// this.archives.save(data);
};

ArchivesModel.prototype.findOne = function(id){
	// this.archives.findOne({ _id:mongo.ObjectId(id) });
};

ArchivesModel.prototype.updateOne = function(data){
	// this.archives.update(data);
};

ArchivesModel.prototype.deleteOne = function(id){
	// this.archives.remove({ _id:id });
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulk requests
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ArchivesModel.prototype.findAll = function(){
	// this.archives.find({});
};

ArchivesModel.prototype.updateAll = function(data){
	// this.archives.update(data);
};

ArchivesModel.prototype.deleteAll = function(){
	// this.archives.remove();
};

module.exports = ambox.uri('models.ArchivesCtrl', ArchivesModel);