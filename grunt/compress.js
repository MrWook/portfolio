module.exports = function() {
	return {
		main: {
			options: {
				mode: 'gzip',
			},
			files: [
				{
					expand:  true,
					cwd:     'public/dist/',
					dest:    'public/zipped/',
					src:     ['**/*.js'],
					ext:     '.js.gz'
				},
				{
					expand:  true,
					cwd:     'public/dist/',
					dest:    'public/zipped/',
					src:     ['**/*.css'],
					ext:     '.css.gz'
				},
			]

		}
	}
};