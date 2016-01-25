/* global ambox */
var admin = require('./hooks/admin');
var comments = require('./hooks/comments');
var errors = require('./hooks/errors');
var jobs = require('./hooks/jobs');
var main = require('./hooks/main');
var posts = require('./hooks/posts');

module.exports = function(app){
	// main
	app.route('/').get(main.index);
	app.route('/flux/:UID?').get(main.flux);
	app.route('/archives/:UID?').get(main.archives);
	app.route('/contact').get(main.contact);
	
	// jobs
	app.route('/jobs').get(jobs.index).post(jobs.create);
	app.route('/jobs/new').get(jobs.new);
	app.route('/jobs/:UID').get(jobs.show).put(jobs.update).delete(jobs.delete);
	app.route('/jobs/:UID/edit').get(jobs.edit);
	
	// posts
	app.route('/posts').get(posts.index).post(posts.create);
	app.route('/posts/new').get(posts.new);
	app.route('/posts/:UID').get(posts.show).put(posts.update).delete(posts.delete);
	app.route('/posts/:UID/edit').get(posts.edit);
	
	// comments
	app.route('/posts/:postUID/comments').post(comments.create);
	app.route('/posts/:postUID/comments/:UID').delete(comments.delete);
	
	// admin
	app.route('/admin').get(admin.index);
	app.route('/admin/jobs').get(admin.index);
	app.route('/admin/posts').get(admin.index);
	app.route('/admin/comments').get(admin.index);
	
	// errors
	app.route('/server-error').get(errors.badRequest);
	app.route('*').get(errors.notFound);
};