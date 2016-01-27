/* global ambox */
var Parse = require('parse/node');
var Archive = Parse.Object.extend('Archive');
var Tag = Parse.Object.extend('Tag');

var defaults = {
	menu:{
		'/flux': 'Flux',
		'/archives': 'Archives',
		'/contact': 'Contact'
	}
};

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
	response.render('partials/archives/new', defaults);
};

// Display a form for editing a specified archive.
ArchivesCtrl.prototype.renderEdit = function(request, response){
	var data = defaults;
	var query = new Parse.Query(Archive);
	query.get(request.params.id).then(function(value){
		if(value){
			data.archive = value;
			response.render('partials/archives/edit', data);
		}else{
			data.error = true;
			data.message = 'Specified archive does not exist';
			response.status(404).send(data);
		}
	}, function(reason){
		console.warn('[Archives.renderEdit\n    '+ reason +'\n]');
		data.error = true;
		data.message = reason;
		response.status(500).send(data);
	});
};

// Display all archives.
ArchivesCtrl.prototype.findAll = function(request, response){
	var data = defaults;
	var query = new Parse.Query(Archive);
	query.descending('createdAt');
	query.find().then(function(value){
		data.archives = value;
		response.render('pages/archives', data);
	}, function(reason){
		console.warn('[Archives.findAll\n    '+ reason +'\n]');
		data.error = true;
		data.message = reason;
		response.status(500).send(data);
	});
};

// Show a given archive based on specified id.
ArchivesCtrl.prototype.findOne = function(request, response){
	var data = defaults;
	var query = new Parse.Query(Archive);
	query.get(request.params.id).then(function(value){
		data.archive = value;
		data.comments = [];
		response.render('posts/show', data);
	}, function(reason){
		console.warn('[Archives.findOne\n    '+ reason +'\n]');
		data.error = true;
		data.message = reason;
		response.status(500).send(data);
	});
};

// Create a new archive with specified title and body.
ArchivesCtrl.prototype.create = function(request, response){
	var data = defaults;
	var dto = ambox.pick(request.body, 'name', 'description');
	var archive = new Archive();
	archive.save(dto).then(function(){
		response.redirect('/archives');
	}, function(reason){
		console.warn('[Archives.create\n    '+ reason +'\n]');
		data.error = true;
		data.message = reason;
		response.status(500).send(data);
	});
};

// Update a archive based on specified id, title and body.
ArchivesCtrl.prototype.update = function(request, response){
	var data = defaults;
	var dto = ambox.pick(request.body, 'name', 'description');
	var archive = new Archive();
	archive.id = request.params.id;
	archive.save(dto).then(function(){
		response.redirect('/archives/'+ archive.id);
	}, function(reason){
		console.warn('[Archives.update\n    '+ reason +'\n]');
		data.error = true;
		data.message = reason;
		response.status(500).send(data);
	});
};

// Delete a archive corresponding to the specified id.
ArchivesCtrl.prototype.delete = function(request, response){
	var data = defaults;
	var archive = new Archive();
	archive.id = request.params.id;
	// ...
};

module.exports = new ArchivesCtrl();