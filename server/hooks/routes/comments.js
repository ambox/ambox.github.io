/* global ambox */
var comments = require('../controllers/comments');

module.exports = function(app, basicAuth){
	app.route('/posts/:post_uid/comments').post(comments.create);
	app.route('/posts/:post_uid/comments/:uid').del(basicAuth, comments.delete);
};