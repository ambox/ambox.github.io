/* global ambox */
var posts = require('../controllers/posts');

module.exports = function(app, basicAuth){
	app.route('/posts').get(posts.index).post(posts.create);
	app.route('/posts/new').get(basicAuth, posts.new);
	app.route('/posts/:uid').get(posts.show).put(basicAuth, posts.update).del(basicAuth, posts.delete);
	app.route('/posts/:uid/edit').get(basicAuth, posts.edit);
};