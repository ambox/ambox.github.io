module.exports = function () {
	'use strict'

	// Run tasks whenever watched files change.
	// @see http://nitoyon.github.io/livereloadx/
	return {
		verbose: true,
		static: true,
		dir: '.'
	}
}