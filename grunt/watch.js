module.exports = function() {
	return {
		sass: {
			files: ['client/sass/**/*.scss'],
			tasks: ['sass', 'cssmin', 'clean']
		},
		views_html: {
			files: ['client/views/**/*.html'],
			tasks: ['minifyHtml:views', 'clean']
		},
		templates: {
			files: ['client/templates/**/*.html'],
			tasks: ['minifyHtml:templates', 'html2js', 'clean']
		},
		views_js: {
			files: ['client/views/**/*.js'],
			tasks: ['babel:views', 'uglify:views', 'clean']
		},
		modules:   {
			files: ['client/modules/**/*.js'],
			tasks: ['babel:modules', 'uglify:modules', 'clean']
		}
	}
};