module.exports = function(grunt) {
	grunt.initConfig({
		// pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			dev: {
				script: 'index.js'
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ['es2015']
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'client/',
						src: ['**/*.js'],
						dest: 'public/',
					}
				]
			}
		},
		uglify: {
			build: {
				files:[
					{
						expand: false,
						src: [
							'bower_components/angular/angular.js',
							'bower_components/angular-animate/angular-animate.js',
							'bower_components/angular-aria/angular-aria.js',
							'bower_components/angular-resource/angular-resource.js',
							'bower_components/angular-route/angular-route.js',
							'bower_components/angular-touch/angular-touch.js',
							'bower_components/jquery/dist/jquery.slim.js',
							'bower_components/bootstrap/dist/js/bootstrap.js',
							'bower_components/angular-translate/angular-translate.js',
							'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
							'bower_components/oclazyload/dist/ocLazyLoad.js',
						],
						dest: 'public/dist/ext.min.js'
					},
					{
						expand: false,
						src: [
							'public/components/init.js',
							'public/components/config.js',
							'public/components/frame_controller.js',
							'public/components/factories.js',
							'public/components/services.js',
							'public/components/filter.js',
							'public/components/directives.js',
							'public/components/canvas.js',
						],
						dest: 'public/dist/app.min.js'
					},
					{
						expand: false,
						src: [
							'bower_components/angular-messages/angular-messages.js',
							'public/js/ui-bootstrap-tooltips.min.js',
							'bower_components/mw-error-messages/dist/error_message.js'
						],
						dest: 'public/views/projects/mw_error_messages/extra.js'
					},
					{
						expand: false,
						src: [
							'public/js/ui-bootstrap-datepicker.min.js',
							'bower_components/mw-datepicker-range/dist/mw-datepicker-range.js'
						],
						dest: 'public/views/projects/mw_datepicker_range/extra.js'
					},
					{
						expand: true,
						cwd: 'public/views/',
						src: ['**/*.js'],
						dest: 'public/views/',
					}
				]
			}
		},
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'client/sass/',
						src: ['**/*.scss'],
						dest: 'public/css/',
						ext: '.css'
					}
				]
			}
		},
		cssmin: {
			build: {
				files: {
					'public/dist/style.min.css': [
						'bower_components/bootstrap/dist/css/bootstrap.css',
						'bower_components/bootstrap/dist/css/bootstrap-theme.css',
						'public/css/main.css',
					],
					'public/views/projects/mw_error_messages/extra.css': [
						'public/css/external/ui-bootstrap-tooltips.css',
						'bower_components/mw-error-messages/dist/error_message.css'
					],
					'public/views/projects/mw_datepicker_range/extra.css': [
						'public/css/external/ui-bootstrap-datepicker.css'
					],
				}
			}
		},
		minifyHtml: {
			options: {
				cdata: false,
				empty: false,
				quotes: true,
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'client/',
						src: ['**/*.html'],
						dest: 'public/',
					}
				]
			}
		},
		compress: {
			main: {
				options: {
					mode: 'gzip',
				},
				expand: true,
				cwd: 'public/dist/',
				dest: 'public/zipped/',
				src: ['**/*'],
				ext: '.gz'
			}
		},
		watch: {
			sass: {
				files: ['client/sass/**/*.scss'],
				tasks: ['sass', 'cssmin', 'compress']
			},
			html: {
				files: ['client/main/**/*.html', 'client/views/**/*.html'],
				tasks: ['minifyHtml']
			},
			js: {
				files: ['client/**/*.js'],
				tasks: ['babel', 'uglify']
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}
	});

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-minify-html');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['babel', 'uglify', 'sass', 'cssmin', 'minifyHtml', 'compress', 'concurrent']);


};