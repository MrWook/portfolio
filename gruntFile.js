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
						cwd: 'public/components/',
						src: ['*.js'],
						dest: 'public/babel/'
					}
				]
			}
		},
		uglify: {
			build: {
				files: {
					'public/dist/ext.min.js': [
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
					'public/dist/app.min.js': [
						'public/babel/init.js',
						'public/babel/config.js',
						'public/babel/frame_controller.js',
						'public/babel/factories.js',
						'public/babel/services.js',
						'public/babel/filter.js',
						'public/babel/directives.js',
						'public/babel/canvas.js',
					],
					'public/views/projects/mw_error_messages/extra.js': [
						'bower_components/angular-messages/angular-messages.js',
						'public/js/ui-bootstrap-tooltips.min.js',
						'bower_components/mw-error-messages/dist/error_message.js'
					],
					'public/views/projects/mw_datepicker_range/extra.js': [
						'public/js/ui-bootstrap-datepicker.min.js',
						'bower_components/mw-datepicker-range/dist/mw-datepicker-range.js'
					],
				}
			}
		},
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'public/sass/',
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
						'public/css/core.css',
						'public/css/cube.css',
						'public/css/loader.css',
						'public/css/navbar.css',
						'public/css/star.css',
						'public/css/notecard.css',
						'public/css/barchart.css',
						'public/css/sites/contact.css',
						'public/css/sites/education.css',
						'public/css/sites/mw_error_messages.css',
						'public/css/sites/mw_datepicker_range.css',
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
		clean: [
			'public/babel/',
			'public/dist/',
			'public/css/sites/',
			'public/css/barchart.css',
			'public/css/canvas.css',
			'public/css/core.css',
			'public/css/cube.css',
			'public/css/loader.css',
			'public/css/navbar.css',
			'public/css/notecard.css',
			'public/css/slider.css',
			'public/css/star.css'
		],
		watch: {
			sass: {
				files: ['public/sass/**/*.scss'],
				tasks: ['sass', 'cssmin', 'compress', 'clean']
			},
			// js: {
			// 	files: ['public/js/**/*.js'],
			// 	tasks: ['uglify']
			// }
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['babel', 'uglify', 'sass', 'cssmin', 'compress', 'clean', 'concurrent']);


};