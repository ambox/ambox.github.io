module.exports = function () {
	'use strict'

	// Connect middleware for adding the livereload script to the response.
	// @see https://github.com/intesso/connect-livereload
	var port = 35729
	var connection = require('connect-livereload')({ port: port })
	var mountFolder = function(connect, dir) {
		return connect.static(require('path').resolve(dir))
	}

	// Run tasks whenever watched files change.
	// @see https://github.com/gruntjs/grunt-contrib-watch
	return {
		options: {
			livereload: port,
			spawn: false
		},
		styles: {
			files: ['<%= scaffold.static %>/styles/**/*.{scss,sass}'],
			tasks: ['styles']
		}
	}
}