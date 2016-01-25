/* global global, ambox */
var caste = require('./server/caste').stub(global, 'ambox');
var server = caste.uri('server', require('./server/index').create());
var app = server.init([
	require('./server/hooks/routes')
]);
server.start();