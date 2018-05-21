module.exports = function() {
	return {
		options: {
			presets:   ['env']
		},
		modules:    {
			files: [
				{
					expand: true,
					cwd:    'client/modules/',
					src:    ['**/*.js'],
					dest:   'public/modules/'
				}
			]
		},
		views:    {
			files: [
				{
					expand: true,
					cwd:    'client/views/',
					src:    ['**/*.js'],
					dest:   'public/views/'
				}
			]
		}
	}
};