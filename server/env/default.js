/* global ambox */
var environ = require('./environ');

environ('.environment');

ambox.uri('env.app.title', 'Ambox');
ambox.uri('env.app.description', 'git-push powered folio');
ambox.uri('env.app.keywords', 'ambox,node,heroku,express');
ambox.uri('env.app.favicon', 'favicon.ico');
ambox.uri('env.app.logo', 'images/share.jpg');
ambox.uri('env.url.protocol', environ.get('NODE_ENV') === 'secure'? 'https' : 'http');
ambox.uri('env.url.port', environ.get('PORT', 3000));
ambox.uri('env.url.host', environ.get('HOST', '0.0.0.0'));
ambox.uri('env.url.server', ambox.env.url.protocol +'://'+ ambox.env.url.host +':'+ ambox.env.url.port);
ambox.uri('env.service.googleAnalytics.appId', environ.get('GOOGLE_ANALYTICS_TRACKING_ID', ''));
ambox.uri('env.service.facebook.appId', environ.get('FACEBOOK_ID', ''));
ambox.uri('env.service.facebook.secret', environ.get('FACEBOOK_SECRET', ''));
ambox.uri('env.service.google.appId', environ.get('GOOGLE_ID', ''));
ambox.uri('env.service.google.secret', environ.get('GOOGLE_SECRET', ''));
ambox.uri('env.service.linkedin.appId', environ.get('LINKEDIN_ID', ''));
ambox.uri('env.service.linkedin.secret', environ.get('LINKEDIN_SECRET', ''));
ambox.uri('env.service.github.appId', environ.get('GITHUB_ID', ''));
ambox.uri('env.service.github.secret', environ.get('GITHUB_SECRET', ''));
ambox.uri('env.service.twitter.appId', environ.get('TWITTER_KEY', ''));
ambox.uri('env.service.twitter.secret', environ.get('TWITTER_SECRET', ''));
ambox.uri('env.service.paypal.appId', environ.get('PAYPAL_ID', ''));
ambox.uri('env.service.paypal.secret', environ.get('PAYPAL_SECRET', ''));
ambox.uri('env.service.parse.appId', environ.get('PARSE_ID', ''));
ambox.uri('env.service.parse.secret', environ.get('PARSE_SECRET', ''));

module.exports = ambox.uri('env');