module.exports = function(){
	const files_js_external = [
		'bower_components/angular/angular.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-aria/angular-aria.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-touch/angular-touch.js',
		'bower_components/angular-messages/angular-messages.js',
		'bower_components/angular-translate/angular-translate.js',
		'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
		'bower_components/jquery/dist/jquery.slim.js',
		'bower_components/bootstrap/dist/js/bootstrap.js',
		'bower_components/oclazyload/dist/ocLazyLoad.js',
		'client/js/ui-bootstrap-custom-tpls-2.5.0.js',
		'bower_components/mw-loader/dist/js/mw-loader.js',
		'bower_components/mw-error-messages/dist/error_message.js',
		'bower_components/mw-datepicker-range/dist/mw-datepicker-range.js',
		'bower_components/mw-alert/dist/js/mw-alert.js'
	];

	let files_js_external_min = [];
	files_js_external.map(function(value){
		let temp = value.split('.');
		temp.splice(temp.length-1, 0, 'min');
		files_js_external_min.push(temp.join('.'));
	});

	const files_css_external = [
		'bower_components/bootstrap/dist/css/bootstrap.css',
		'bower_components/bootstrap/dist/css/bootstrap-theme.css',
		'bower_components/mw-error-messages/dist/error_message.css',
		'bower_components/mw-alert/dist/css/mw-alert.css',
		'bower_components/mw-loader/dist/css/mw-loader.css',
		'bower_components/fontawesome/css/font-awesome.css',
		'client/css/ui-bootstrap-custom-tpls-2.5.0.csp.css',

	];

	let files_css_external_min = [];
	files_css_external.map(function(value){
		let temp = value.split('.');
		temp.splice(temp.length-1, 0, 'min');
		files_css_external_min.push(temp.join('.'));
	});
	return {
		options:  {
			// sourceMap: true,
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
		dist:     {
			files: [
				{
					expand: false,
					src:    files_js_external,
					dest:   'public/dist/external_scripts.js'
				},
				{
					expand: false,
					src:    files_css_external,
					dest:   'public/dist/external_styles.css'
				}
			]
		},
		dist_min: {
			files: [
				{
					expand: false,
					src:    files_js_external_min,
					dest:   'public/dist/external_scripts.min.js'
				},
				{
					expand: false,
					src:    files_css_external_min,
					dest:   'public/dist/external_styles.min.css'
				}
			]
		}
	};
};