module.exports = function (grunt) {
	'use strict'

	// Globbing
	// for performance reasons we're only matching one level down:
	// 'test/spec/{,*/}*.js'

	// use this if you want to recursively match all subfolders:
	// 'test/spec/**/*.js'

	// Load multiple grunt tasks using globbing patterns
	// @see https://www.npmjs.com/package/load-grunt-tasks
	require('load-grunt-tasks')(grunt)

	var readOptionalJSON = function(filepath) {
		var data = {}
		try {
			// Strip comments from JSON. Lets you use comments in your JSON files!
			// @see https://github.com/sindresorhus/strip-json-comments
			data = JSON.parse(require('strip-json-comments')(
				require('fs').readFileSync(filepath, { encoding: 'utf8' })
			))
		} catch(error) {
			console.log('[readOptionalJSON Error: %s\n]', error.stack)
		}
		return data
	}

	var execute = function(pack) {
		// Grunt plugin that lets you break up your Gruntfile config by task
		// @see https://www.npmjs.com/package/load-grunt-config
		require('load-grunt-config')(grunt, {
			data: pack,
			configPath: require('path').join(process.cwd(), 'tasks'),
			loadGruntTasks: {
				config: pack,
				scope: 'devDependencies'
			}
		})
	}

	grunt.registerTask('express', 'Run express server.', function() {
		// lsof -i :<port>
		var open = require('open')
		var spawn = require('child_process').spawn
		grunt.log.writeln('Starting Ambox development server.')
		// stdio: 'inherit' let us see express output in grunt
		var PIPE = { stdio: 'inherit' }
		spawn('node_modules/nodemon/bin/nodemon.js', ['-q', 'server'], PIPE)
		setTimeout(open, 1000, 'http://0.0.0.0:3000')
	})

	execute(grunt.file.readJSON('package.json'))
}