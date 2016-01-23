/* global global, ambox */
var scope = require('./server/utils/scope').stub(global, 'ambox');
var server = ambox.uri('server', require('./server/index'));