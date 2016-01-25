/* global ambox */
var main = require('../controllers/main');

module.exports = function(app){
	app.route('/').get(main.index);
	app.route('/flux/:uid?').get(main.flux);
	app.route('/archives/:uid?').get(main.archives);
	app.route('/contact').get(main.contact);
	app.route('/server-error').get(main.badRequest);
	app.route('*').get(main.notFound);
};