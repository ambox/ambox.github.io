/* global ambox */
var comments = require('../controllers/comments');

module.exports = function(app){
	app.route('/posts/:post_uid/comments').post(comments.create);
	app.route('/posts/:post_uid/comments/:uid').delete(comments.delete);
};