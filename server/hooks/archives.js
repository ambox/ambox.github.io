/* global ambox */
var Parse = require('parse/node');
var Archive = Parse.Object.extend('Archive');
// var Tag = Parse.Object.extend('Tag');

// Display all archives.
exports.index = function(request, response){
	var query = new Parse.Query(Archive);
	query.descending('createdAt');
	query.find().then(function(value){
		console.warn('[Archives.index\n    '+ value +'\n]');
		response.render('pages/archives', { archives:value });
	}, function(reason){
		console.warn('[Archives.index\n    '+ reason +'\n]');
		response.status(500).send({
			message:reason,
			error:true
		});
	});
};

// Display a form for creating a new archive.
exports.new = function(request, response){
	response.render('partials/archives/new', {});
};

// Create a new archive with specified title and body.
exports.create = function(request, response){
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

// Show a given archive based on specified id.
exports.show = function(request, response){
	var archiveQuery = new Parse.Query(Archive);
	archiveQuery.get(request.params.id).then(function(value){
		response.render('posts/show', { archive:value, comments:[] });
	}, function(reason){
		console.warn('[Archives.show\n    '+ reason +'\n]');
		response.status(500).send({
			message:reason,
			error:true
		});
	});
};

// Display a form for editing a specified archive.
exports.edit = function(request, response){
};

// Update a archive based on specified id, title and body.
exports.update = function(request, response){
};

// Delete a archive corresponding to the specified id.
exports.delete = function(request, response){
};
