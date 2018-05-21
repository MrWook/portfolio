module.exports = function(copyright) {
	return {
		options: {
			sourceMap: true,
			banner:copyright
		},
		dist: {
			files: [
				{
					src:    ['temp/css/**/*.css'],
					dest:   'public/dist/style.css'
				}
			]
		}
	}
};