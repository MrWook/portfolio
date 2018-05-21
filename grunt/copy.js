module.exports = function() {
	return {
		dist: {
			files: [
				{
					expand: true,
					cwd:    'client/js/',
					src:    ['**/*.js'],
					dest:   'public/js/'
				},
				{
					expand: true,
					cwd:    'client/css/',
					src:    ['**/*.css'],
					dest:   'public/css/'
				},
			]
		},
		map: {
			files: [
				{
					expand: true,
					cwd:    'public/dist/',
					src:    ['**/*.map*'],
					dest:   'public/zipped/'
				},
			]
		}
	}
};