/* global ambox */
var admin = require('../controllers/admin');

module.exports = function(app){
	app.route('/admin').get(admin.index);
	app.route('/admin/jobs').get(admin.index);
	app.route('/admin/posts').get(admin.index);
	app.route('/admin/comments').get(admin.index);
};