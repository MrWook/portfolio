module.exports = function(grunt) {
	return {
		options: {
			logConcurrentOutput: true
		},
		tasks:   ['nodemon', 'watch']
	}
};