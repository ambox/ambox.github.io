/* global ambox */
var defaults = {
	menu:{
		'/flux': 'Flux',
		'/archives': 'Archives',
		'/contact': 'Contact'
	}
};

exports.flux = function(app, basicAuth){
	var data = null;
	var cls = require('./hooks/flux');
	var ctrl = new cls(data, defaults);
	var format = ':format(\.json|\.jsonp|\.html|\.text)?';
	app.route('/'+format.replace(/\./g, '')).post(ctrl.create).get(ctrl.findAll).put(ctrl.updateAll).delete(ctrl.deleteAll);
	app.route('/flux'+format).post(ctrl.create).get(ctrl.findAll).put(ctrl.updateAll).delete(ctrl.deleteAll);
	app.route('/flux/new').get(ctrl.new);
	app.route('/flux/:uid'+format).get(ctrl.findOne).put(ctrl.updateOne).delete(ctrl.deleteOne);
	app.route('/flux/:uid/edit').get(ctrl.edit);
};

exports.archives = function(app, basicAuth){
	var data = null;
	var cls = require('./hooks/archives');
	var ctrl = new cls(data, defaults);
	var format = ':format(\.json|\.jsonp|\.html|\.text)?';
	app.route('/archives'+format).post(ctrl.create).get(ctrl.findAll).put(ctrl.updateAll).delete(ctrl.deleteAll);
	app.route('/archives/new').get(ctrl.new);
	app.route('/archives/:uid'+format).get(ctrl.findOne).put(ctrl.updateOne).delete(ctrl.deleteOne);
	app.route('/archives/:uid/edit').get(ctrl.edit);
};

exports.contact = function(app, basicAuth){
	var data = null;
	var cls = require('./hooks/contact');
	var ctrl = new cls(data, defaults);
	app.route('/contact').post(ctrl.create).get(ctrl.index);
};

exports.errors = function(app, basicAuth){
	var data = null;
	var cls = require('./hooks/errors');
	var ctrl = new cls(data, defaults);
	app.route('/server-error').get(ctrl.badRequest);
	app.route('/*').get(ctrl.notFound);
};