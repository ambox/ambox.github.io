var path = require('path');
exports.url = { base:path.resolve('.') };
exports.url.template = exports.url.base+'/views';
exports.url.static = exports.url.base+'/public';
exports.url.cdn = '';