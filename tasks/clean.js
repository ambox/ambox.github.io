module.exports = function () {
	'use strict'

	// Clean files and folders.
	// @see https://github.com/gruntjs/grunt-contrib-clean
	return {
		tmp: '<%= scaffold.tmp %>/'
	}
}