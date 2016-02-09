module.exports = function () {
	'use strict'

	// Compile Compass to CSS.
	// @see https://github.com/gruntjs/grunt-contrib-compass
	return {
		static: {
			options: {
				importPath: ['<%= scaffold.vendors %>'],
				fontsDir: '<%= scaffold.static %>/styles/fonts',
				sassDir: '<%= scaffold.static %>/styles',
				cssDir: '<%= scaffold.static %>/styles',
				cacheDir: '<%= scaffold.tmp %>',
				outputStyle: 'nested',
				assetCacheBuster: false,
				noLineComments: true,
				relativeAssets: true,
				sourcemap: false,
				quiet: false,
				trace: true,
				force: false
			},
			files: {
				'<%= scaffold.static %>/styles/skin.css': [
					'<%= scaffold.static %>/styles/skin.{scss,sass}'
				]
			}
		}
	}
}