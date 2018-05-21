'use strict';
angular.module('portfolio').controller('ErrorMsgCtrl',['$scope', function($scope) {
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