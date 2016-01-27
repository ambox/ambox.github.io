/* global global, ambox */
var caste = require('./server/caste').stub(global, 'ambox');
var config = require('./server/env/cfg');
var server = caste.uri('server', require('./server/index').create(config));
var app = server.init(require('./server/urls'));
server.start();