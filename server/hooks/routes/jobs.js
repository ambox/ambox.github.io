/* global ambox */
var jobs = require('../controllers/jobs');

module.exports = function(app){
	app.route('/jobs').get(jobs.index).post(jobs.create);
	app.route('/jobs/new').get(jobs.new);
	app.route('/jobs/:uid').get(jobs.show).put(jobs.update).delete(jobs.delete);
	app.route('/jobs/:uid/edit').get(jobs.edit);
};