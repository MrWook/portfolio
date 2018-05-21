'use strict';
angular.module('portfolio').controller('portfolioAlertCtrl', ['$scope', 'mwAlertService', function($scope, mwAlertService){
	$scope.message = {};
	$scope.message.type = 'success';
	$scope.open = function(){
		$scope.message.close_auto = false;
		mwAlertService.open($scope.message);
	};
}]);