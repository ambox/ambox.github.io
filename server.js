'use strict';

// var server = require('./server');
var environ = require('./server/utils/environ');

// environ(null);
environ(environ.get('ENV', __dirname+'/.environment'));
console.log('.environment.PORT:', environ.get('PORT', 9000));
console.log('.environment.HOST:', environ.get('HOST'));
console.log('.environment.process.PORT:', process.env.PORT);
console.log('.environment.process.HOST:', process.env.HOST);
console.log('====================================');