/* global ambox */
var Parse = require('parse');
var Job = Parse.Object.extend('Job');
var Tag = Parse.Object.extend('Tag');

// Display all jobs.
exports.index = function(request, response){
};

// Display a form for creating a new job.
exports.new = function(request, response){
	response.render('partials/jobs/new', {});
};

// Create a new job with specified title and body.
exports.create = function(request, response){
	var dto = ambox.pick(request.body, 'name');
	var job = new Job();
	job.save(dto).then(function(){
		response.redirect('/jobs');
	}, function(){
		response.send({
			message:'Failed saving job',
			error:true,
			status:500,
			data:{}
		});
	});
};

// Show a given job based on specified id.
exports.show = function(request, response){
};

// Display a form for editing a specified job.
exports.edit = function(request, response){
};

// Update a job based on specified id, title and body.
exports.update = function(request, response){
};

// Delete a job corresponding to the specified id.
exports.delete = function(request, response){
};
