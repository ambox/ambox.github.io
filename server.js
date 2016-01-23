/* global global, ambox */
var scope = require('./server/utils/scope').stub(global, 'ambox');
var server = scope.uri('server', require('./server/index').create());
var app = server.init();
server.start();