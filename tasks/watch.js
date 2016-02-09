module.exports = function () {
	'use strict'

	// Run tasks whenever watched files change.
	// @see https://github.com/gruntjs/grunt-contrib-watch
	return {
		options: {
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