'use strict';
angular.module('portfolio').controller('ErrorMsgCtrl',['$scope', 'PPconfig', function($scope, PPconfig) {
	$scope.github_link = PPconfig.github+'mw-error-messages';
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