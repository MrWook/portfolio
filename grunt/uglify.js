module.exports = function(copyright) {
	return {
		options: {
			sourceMap: true,
			banner: copyright
		},
		modules: {
			files: [
				{
					expand: false,
					src:    [
						'public/modules/*.js',
						'public/views/init.js',
					],
					dest:   'public/dist/app.js'
				},
			]
		},
		views: {
			files: [
				{
					expand: true,
					cwd:    'public/views/',
					src:    ['**/*.js'],
					dest:   'public/views/',
					ext:    '.js'
				}
			]
		}
	}
};