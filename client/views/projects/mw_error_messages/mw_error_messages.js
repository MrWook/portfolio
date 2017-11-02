'use strict';
const errorMsg = angular.module('errorMsg', [
	'ngMessages',
	'ui.bootstrap',
	'mw-error-message'
]);

errorMsg.config(['mwConfig',
	function(mwConfig) {
		mwConfig.icon = true;
		mwConfig.translate = true;
		mwConfig.success = true;
		mwConfig.messages['birthday'] = 'ERROR_MSG_BIRTHDAY';
	}]);
errorMsg.controller('ErrorMsgCtrl',['$scope', function($scope) {

	$scope.mwOptions_email = {
		tooltip: true
	};

	$scope.mwOptions_name = {
		success: false
	};

	$scope.mwOptions_age = {
		icon: false,
	};
}]);


errorMsg.directive('birthday', [ function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			ctrl.$validators.birthday = function(modelValue) {
				return ctrl.$isEmpty(modelValue) || modelValue >= 18;
			};
		}
	};
}]);