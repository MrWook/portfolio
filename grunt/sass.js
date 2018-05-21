module.exports = function(copyright) {
	return {
		options: {
			// sourceMap: true,
			banner: copyright
		},
		dist: {
			files: [
				{
					expand: true,
					cwd:    'client/sass/',
					src:    ['**/*.scss'],
					dest:   'temp/css/',
					ext:    '.css'
				}
			]
		}
	}
};