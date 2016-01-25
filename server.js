/* global global, ambox */
var caste = require('./server/caste').stub(global, 'ambox');
var server = caste.uri('server', require('./server/index').create());
var app = server.init([
	require('./server/hooks/routes/main'),
	require('./server/hooks/routes/jobs'),
	require('./server/hooks/routes/posts'),
	require('./server/hooks/routes/comments'),
	require('./server/hooks/routes/admin')
]);
server.start();