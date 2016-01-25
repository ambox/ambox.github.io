/* global ambox */
var jobs = require('../controllers/jobs');

module.exports = function(app, basicAuth){
	app.route('/jobs').get(jobs.index).post(jobs.create);
	app.route('/jobs/new').get(basicAuth, jobs.new);
	app.route('/jobs/:uid').get(jobs.show).put(basicAuth, jobs.update).del(basicAuth, jobs.delete);
	app.route('/jobs/:uid/edit').get(basicAuth, jobs.edit);
};