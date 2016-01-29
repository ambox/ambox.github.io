/* global ambox */
exports.flux = function(app, basicAuth){
	var flux = require('./hooks/flux');
	app.route('/').get(flux.index);
	app.route('/flux:format').get(flux.findAll);
	app.route('/flux:format/:uid').get(flux.findOne).put(flux.update).delete(flux.delete);
};

exports.archives = function(app, basicAuth){
	var archives = require('./hooks/archives');
	// app.route('/archives').get(archives.findAll).post(archives.create);
	// app.route('/archives/new').get(basicAuth, archives.renderNew);
	// app.route('/archives/:uid').get(archives.findOne).put(archives.update).delete(archives.delete);
	// app.route('/archives/:uid/edit').get(archives.renderEdit);
};

exports.contact = function(app, basicAuth){
	var contact = require('./hooks/contact');
	app.route('/contact').get(contact.index);
};

exports.errors = function(app, basicAuth){
	var errors = require('./hooks/errors');
	app.route('/server-error').get(errors.badRequest);
	app.route('*').get(errors.notFound);
};