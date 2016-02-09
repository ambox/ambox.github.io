/* global global */
var assert = require('assert')
var ambox = require('./server/caste').stub(global, 'ambox')
var config = require('./server/env/cfg')
var database = ambox.uri('database', require('./server/db/firebase'))
var server = ambox.uri('server', require('./server/index').create(config))
server.init(require('./server/urls'))
server.start()