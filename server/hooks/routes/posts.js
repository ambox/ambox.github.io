/* global ambox */
var posts = require('../controllers/posts');

module.exports = function(app){
	app.route('/posts').get(posts.index).post(posts.create);
	app.route('/posts/new').get(posts.new);
	app.route('/posts/:uid').get(posts.show).put(posts.update).delete(posts.delete);
	app.route('/posts/:uid/edit').get(posts.edit);
};