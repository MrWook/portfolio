module.exports = function() {
	return {
		options: {
			cdata:  false,
			empty:  false,
			quotes: true
		},
		views:    {
			files: [
				{
					expand: true,
					cwd:    'client/views/',
					src:    ['**/*.html'],
					dest:   'public/views/'
				}
			]
		},
		templates:    {
			files: [
				{
					expand: true,
					cwd:    'client/templates/',
					src:    ['**/*.html'],
					dest:   'temp/templates/'
				},
			]
		}
	}
};