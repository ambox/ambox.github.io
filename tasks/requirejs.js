module.exports = function (grunt, opts) {
	'use strict'

	// Optimize RequireJS projects using r.js
	// @see https://github.com/gruntjs/grunt-contrib-requirejs
	var scaffold = opts.scaffold, settings = {};
	scaffold.modules.forEach(function(module){
		settings[module] = {
			options: {
				baseUrl: '<%= scaffold.static %>/scripts',
				include: ['requirejs', module],
				mainConfigFile: '<%= scaffold.static %>/scripts/'+ module +'.js',
				out: '<%= scaffold.static %>/scripts/'+ module +'.min.js',
				wrap: { start: '(function(){', end: '}).call(this);' },
				uglify2: { mangle: true },
				fileExclusionRegExp: /(min\.js)$/,
				preserveLicenseComments: false,
				findNestedDependencies: true,
				generateSourceMaps: false,
				removeCombined: true,
				useStrict: true
			}
		}
	});
	return settings;
}