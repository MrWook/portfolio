'use strict';
angular.module('portfolio', [
	'ngAnimate',
	'ngRoute',
	'ngResource',
	'ngTouch',
	'ngMessages',
	'oc.lazyLoad',
	'pascalprecht.translate',
	'ui.bootstrap',
	'mw-datepicker-range',
	'mw-error-message',
	'mw-loader',
	'mw-alert',
	'portfolio-config',
	'portfolio-services',
	'portfolio-factories',
	'portfolio-filter',
	'portfolio-directives',
	'portfolio-menu',
	'portfolio-router',
	'portfolio-run',
	'portfolio-templates'
]);

//manuel bootstrap of angular to get config data
function fetchData(){
	let initInjector = angular.injector(['ng']);
	let $http        = initInjector.get('$http');
	let config       = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
	$http.post('config', '', config).then(function(response){
		if(response != undefined && response.data != undefined && response.data.type == 'success'){
			let temp = angular.injector(['ng', 'portfolio-config']).get('PPconfig');
			Object.assign(temp, response.data.config);
			bootstrapApplication();
		}else{
			show_error();
		}
	}, function(error){
		show_error();
	});
}

function show_error(){
	angular.element(document.body).html('<div class="filesystem_error"><span >An filesystem error occured, the page could not be loaded. Reload the page or try again later</span></div>');

}

function bootstrapApplication(){
	angular.element(document).ready(function(){
		angular.bootstrap(document, ['portfolio']);
	});
}

fetchData();