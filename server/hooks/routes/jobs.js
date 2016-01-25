/* global ambox */
var jobs = require('../controllers/jobs');

module.exports = function(app){
	app.route('/jobs').get(jobs.index).post(jobs.create);
	app.route('/jobs/new').get(jobs.new);// get:oauth
	app.route('/jobs/:uid').get(jobs.show).put(jobs.update).del(jobs.delete);// (put|delete):oauth
	app.route('/jobs/:uid/edit').get(jobs.edit);// oauth
};