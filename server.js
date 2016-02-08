/* global global */
var assert = require('assert')
var ambox = require('./server/caste').stub(global, 'ambox')
var config = require('./server/env/cfg')
var database = require('./server/db/mongo')
var server = ambox.uri('server', require('./server/index').create(config))
database.connect(config.database.uri, function(error, database){
	assert.equal(null, error)
	ambox.uri('database', database)
	server.init(require('./server/urls'))
	server.start()
	// database.close()
})