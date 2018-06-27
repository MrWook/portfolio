'use strict';
module.exports = function(grunt){
	let copyright = `/**
* @version v<%= pkg.version %>
* @link <%= pkg.homepage %>
* @license <%= pkg.license %>
* Copyright (c) ${(new Date()).getFullYear()} <%= pkg.author %>
*/\r`;

	// Load all grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long grunt task take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.initConfig({
						 pkg:        grunt.file.readJSON('package.json'),
						 sass:       require('./grunt/sass')(copyright),
						 babel:      require('./grunt/babel')(),
						 concat:     require('./grunt/concat')(),
						 copy:       require('./grunt/copy')(),
						 uglify:     require('./grunt/uglify')(copyright),
						 cssmin:     require('./grunt/cssmin')(copyright),
						 minifyHtml: require('./grunt/minifyHtml')(),
						 html2js:    require('./grunt/html2js')(),
						 compress:   require('./grunt/compress')(),
						 watch:      require('./grunt/watch')(),
						 nodemon:    require('./grunt/nodemon')(),
						 concurrent: require('./grunt/concurrent')(),
						 clean:      require('./grunt/concurrent')()
					 });

	grunt.registerTask('default', [
		'babel',
		'concat',
		'minifyHtml',
		'html2js',
		'uglify',
		'sass',
		'cssmin',
		'compress',
		'copy',
		'clean',
		'concurrent',
	]);
};