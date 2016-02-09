module.exports = function () {
	'use strict'

	// Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.
	// @see https://github.com/nDmitry/grunt-autoprefixer
	// @see https://github.com/postcss/autoprefixer/wiki/support-list
	// @see https://github.com/ai/browserslist#queries
	return {
		options: {
			browsers: ['last 2 versions', '> 1%', 'ios 7.1', 'android 4.1', 'ie 9']
		},
		static: {
			files: [{
				expand: true,
				cwd: '<%= scaffold.static %>/styles/',
				src: '{,*/}*.css',
				dest: '<%= scaffold.static %>/styles/'
			}]
		}
	}
}