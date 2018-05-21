'use strict';
angular.module('portfolio-config', [
	'pascalprecht.translate',
	'mw-error-message',
]);
angular.module('portfolio-config').constant('PPconfig', {});
angular.module('portfolio-config').config(['$locationProvider', '$httpProvider', 'PPconfig', '$translateProvider', 'mwConfig', function($locationProvider, $httpProvider, PPconfig, $translateProvider, mwConfig){
	$locationProvider.html5Mode(true);
	$httpProvider.useApplyAsync(true);

	/*
	 * i18n
	 */
	$translateProvider.useStaticFilesLoader({
												prefix: 'lang/',
												suffix: ''
											});
	//default language
	$translateProvider.preferredLanguage(PPconfig.language);
	localStorage.setItem('language', PPconfig.language);
	//sanitization strategy
	$translateProvider.useSanitizeValueStrategy('escape');

	mwConfig.icon = true;
	mwConfig.translate = true;
	mwConfig.success = true;
	mwConfig.messages['birthday'] = 'ERROR_MSG_BIRTHDAY';
}]);
