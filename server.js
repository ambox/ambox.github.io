/* global global */
var ambox = require('./server/caste').stub(global, 'ambox');
var config = require('./server/env/cfg');
var server = ambox.uri('server', require('./server/index').create(config));
var app = server.init(require('./server/urls'));
server.start();