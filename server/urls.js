/* global ambox */
var root = require('./hooks/root');
var flux = require('./hooks/flux');
var archives = require('./hooks/archives');
var contact = require('./hooks/contact');
var comments = require('./hooks/comments');
var posts = require('./hooks/posts');
var errors = require('./hooks/errors');
var admin = require('./hooks/admin');

module.exports = function(app, basicAuth){
	
	// main
	app.route('/').get(root.index);
	
	// flux
	app.route('/flux').get(flux.index);
	
	// archives
	app.route('/archives').get(archives.index).post(archives.create);
	app.route('/archives/new').get(basicAuth, archives.new);
	// app.route('/archives/:uid').get(archives.show).put(archives.update).delete(archives.delete);
	// app.route('/archives/:uid/edit').get(archives.edit);
	
	// contact
	app.route('/contact').get(contact.index);
	
	// posts
	// app.route('/posts').get(posts.index).post(posts.create);
	// app.route('/posts/new').get(posts.new);
	// app.route('/posts/:uid').get(posts.show).put(posts.update).delete(posts.delete);
	// app.route('/posts/:uid/edit').get(posts.edit);
	
	// comments
	// app.route('/posts/:post_uid/comments').post(comments.create);
	// app.route('/posts/:post_uid/comments/:uid').delete(comments.delete);
	
	// admin
	// app.route('/admin').get(admin.index);
	// app.route('/admin/jobs').get(admin.index);
	// app.route('/admin/posts').get(admin.index);
	// app.route('/admin/comments').get(admin.index);
	
	// errors
	app.route('/server-error').get(errors.badRequest);
	app.route('*').get(errors.notFound);
};