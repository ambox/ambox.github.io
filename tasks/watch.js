module.exports = function () {
	'use strict'

	// Run tasks whenever watched files change.
	// @see https://github.com/gruntjs/grunt-contrib-watch
	return {
		options: {
			livereload: false, // LiveReloadX take care of it
			debounceDelay: 250,
			interrupt: false,
			spawn: false
		},
		styles: {
			files: ['<%= scaffold.static %>/styles/**/*.{scss,sass}'],
			tasks: ['styles']
		}
	}
}