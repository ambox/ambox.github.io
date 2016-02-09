module.exports = function (grunt) {
	'use strict'

	// Compile Sass to CSS.
	// @see https://github.com/sindresorhus/grunt-sass
	return {
		static: {
			options: {
				includePaths: ['<%= scaffold.vendors %>']
			},
			files: {
				'<%= scaffold.static %>/styles/skin.css': [
					'<%= scaffold.static %>/styles/skin.scss'
				]
			}
		}
	}
}