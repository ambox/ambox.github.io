'use strict';
// common

var environ = require('../utils/environ');
var defaultSettings = {
	protocol:environ.get('NODE_ENV') === 'secure'? 'https' : 'http',
	port:environ.get('PORT', 3000),
	host:environ.get('HOST', '0.0.0.0'),
	templateEngine:'html'
};

module.exports = defaultSettings;