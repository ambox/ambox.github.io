/* global ambox */
var environ = require('../utils/environ');
ambox.uri('env.protocol', environ.get('NODE_ENV') === 'secure'? 'https' : 'http');
ambox.uri('env.port', environ.get('PORT', 3000));
ambox.uri('env.host', environ.get('HOST', '0.0.0.0'));
ambox.uri('env.templateEngine', 'html');
module.exports = ambox.uri('env');