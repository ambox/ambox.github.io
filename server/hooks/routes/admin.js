/* global ambox */
var admin = require('../controllers/admin');

module.exports = function(app, basicAuth){
	app.route('/admin').get(basicAuth, admin.index);
	app.route('/admin/posts').get(basicAuth, admin.index);
	app.route('/admin/comments').get(basicAuth, admin.index);
};