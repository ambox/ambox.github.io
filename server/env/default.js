/* global ambox */
var environ = require('../utils/environ');
ambox.uri('env.app.title', 'Ambox');
ambox.uri('env.app.description', 'git-push powered folio');
ambox.uri('env.app.keywords', 'ambox,node,heroku,express');
ambox.uri('env.app.favicon', 'images/favicon.ico');
ambox.uri('env.app.logo', 'images/share.jpg');
ambox.uri('env.url.protocol', environ.get('NODE_ENV') === 'secure'? 'https' : 'http');
ambox.uri('env.url.port', environ.get('PORT', 3000));
ambox.uri('env.url.host', environ.get('HOST', '0.0.0.0'));
ambox.uri('env.url.server', ambox.env.url.protocol +'://'+ ambox.env.url.host +':'+ ambox.env.url.port);
ambox.uri('env.service.googleAnalytics.appId', '');
ambox.uri('env.service.facebook.appId', '');
module.exports = ambox.uri('env');