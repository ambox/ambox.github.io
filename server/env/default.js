/* global ambox */
var environ = require('./environ')

ambox.uri('env.app.title', 'Ambox')
ambox.uri('env.app.description', 'git-push powered folio')
ambox.uri('env.app.keywords', 'ambox,node,heroku,express')
ambox.uri('env.app.favicon', 'favicon.ico')
ambox.uri('env.app.logo', 'images/share.jpg')
ambox.uri('env.app.livereload', ambox.env.role === 'localhost')

ambox.uri('env.url.protocol', ambox.env.role === 'secure'? 'https' : 'http')
ambox.uri('env.url.port', environ.get('PORT', 3000))
ambox.uri('env.url.host', environ.get('HOST', '0.0.0.0'))
ambox.uri('env.url.server', ambox.env.url.protocol +'://'+ ambox.env.url.host +':'+ ambox.env.url.port)

ambox.uri('env.database.debug', environ.get('DATABASE_DEBUG', false));
ambox.uri('env.database.port', environ.get('DATABASE_PORT', 27017));
ambox.uri('env.database.host', environ.get('DATABASE_HOST', '127.0.0.1'));
ambox.uri('env.database.uri', 'mongodb://'+ ambox.env.database.host +':'+ ambox.env.database.port +'/ambox');
ambox.uri('env.database.credentials.username', '');
ambox.uri('env.database.credentials.password', '');

ambox.uri('env.service.googleAnalytics.appId', environ.get('GOOGLE_ANALYTICS_TRACKING_ID', ''))
ambox.uri('env.service.facebook.appId', environ.get('FACEBOOK_ID', ''))
ambox.uri('env.service.facebook.secret', environ.get('FACEBOOK_SECRET', ''))
ambox.uri('env.service.facebook.callbackURL', environ.get('FACEBOOK_CALLBACK_URL', '/api/auth/facebook/callback'))
ambox.uri('env.service.google.appId', environ.get('GOOGLE_ID', ''))
ambox.uri('env.service.google.secret', environ.get('GOOGLE_SECRET', ''))
ambox.uri('env.service.google.callbackURL', environ.get('GOOGLE_CALLBACK_URL', '/api/auth/google/callback'))
ambox.uri('env.service.linkedin.appId', environ.get('LINKEDIN_ID', ''))
ambox.uri('env.service.linkedin.secret', environ.get('LINKEDIN_SECRET', ''))
ambox.uri('env.service.linkedin.callbackURL', environ.get('LINKEDIN_CALLBACK_URL', '/api/auth/linkedin/callback'))
ambox.uri('env.service.github.appId', environ.get('GITHUB_ID', ''))
ambox.uri('env.service.github.secret', environ.get('GITHUB_SECRET', ''))
ambox.uri('env.service.github.callbackURL', environ.get('GITHUB_CALLBACK_URL', '/api/auth/github/callback'))
ambox.uri('env.service.twitter.appId', environ.get('TWITTER_KEY', ''))
ambox.uri('env.service.twitter.secret', environ.get('TWITTER_SECRET', ''))
ambox.uri('env.service.twitter.callbackURL', environ.get('TWITTER_CALLBACK_URL', '/api/auth/twitter/callback'))
ambox.uri('env.service.paypal.appId', environ.get('PAYPAL_ID', ''))
ambox.uri('env.service.paypal.secret', environ.get('PAYPAL_SECRET', ''))
ambox.uri('env.service.paypal.callbackURL', environ.get('PAYPAL_CALLBACK_URL', '/api/auth/paypal/callback'))
ambox.uri('env.service.paypal.sandbox', true)
module.exports = ambox.uri('env')