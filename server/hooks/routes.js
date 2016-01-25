/* global ambox */
var admin = require('./controllers/admin');
var comments = require('./controllers/comments');
var jobs = require('./controllers/jobs');
var main = require('./controllers/main');
var posts = require('./controllers/posts');

module.exports = function(app){
	// main
	app.route('/').get(main.index);
	app.route('/flux/:UID?').get(main.flux);
	app.route('/archives/:UID?').get(main.archives);
	app.route('/contact').get(main.contact);
	app.route('/server-error').get(main.badRequest);
	app.route('*').get(main.notFound);
	
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
};