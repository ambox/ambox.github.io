/* global ambox */
var Parse = require('parse/node');
var Archive = Parse.Object.extend('Archive');
var Tag = Parse.Object.extend('Tag');

var ArchivesCtrl = function(){
	ambox.bindAll(this,
		'findAll',
		'findOne',
		'create',
		'update',
		'delete'
	);
};

// Display a form for creating a new archive.
ArchivesCtrl.prototype.renderNew = function(request, response){
	response.render('partials/archives/new', {});
};

// Display a form for editing a specified archive.
ArchivesCtrl.prototype.renderEdit = function(request, response){
	var query = new Parse.Query(Archive);
	query.get(request.params.id).then(function(value){
		if(value){
			response.render('partials/archives/edit', { archive:value });
		}else{
			response.status(404).send({
				message:'specified archive does not exist',
				error:true
			});
		}
	}, function(reason){
		console.warn('[Archives.renderEdit\n    '+ reason +'\n]');
		response.status(500).send({
			message:reason,
			error:true
		});
	});
};

// Display all archives.
ArchivesCtrl.prototype.findAll = function(request, response){console.log(this)
	var query = new Parse.Query(Archive);
	query.descending('createdAt');
	query.find().then(function(value){
		response.render('pages/archives', { archives:value });
	}, function(reason){
		console.warn('[Archives.findAll\n    '+ reason +'\n]');
		response.status(500).send({
			message:reason,
			error:true
		});
	});
};

// Show a given archive based on specified id.
ArchivesCtrl.prototype.findOne = function(request, response){
	var query = new Parse.Query(Archive);
	query.get(request.params.id).then(function(value){
		response.render('posts/show', { archive:value, comments:[] });
	}, function(reason){
		console.warn('[Archives.findOne\n    '+ reason +'\n]');
		response.status(500).send({
			message:reason,
			error:true
		});
	});
};

// Create a new archive with specified title and body.
ArchivesCtrl.prototype.create = function(request, response){
	var dto = ambox.pick(request.body, 'name', 'description');
	var archive = new Archive();
	archive.save(dto).then(function(){
		response.redirect('/archives');
	}, function(reason){
		console.warn('[Archives.create\n    '+ reason +'\n]');
		response.status(500).send({
			message:reason,
			error:true
		});
	});
};

// Update a archive based on specified id, title and body.
ArchivesCtrl.prototype.update = function(request, response){
	var dto = ambox.pick(request.body, 'name', 'description');
	var archive = new Archive();
	archive.id = request.params.id;
	archive.save(dto).then(function(){
		response.redirect('/archives/'+ archive.id);
	}, function(reason){
		console.warn('[Archives.update\n    '+ reason +'\n]');
		response.status(500).send({
			message:reason,
			error:true
		});
	});
};

// Delete a archive corresponding to the specified id.
ArchivesCtrl.prototype.delete = function(request, response){
	var archive = new Archive();
	archive.id = request.params.id;
	// ...
};

module.exports = new ArchivesCtrl();