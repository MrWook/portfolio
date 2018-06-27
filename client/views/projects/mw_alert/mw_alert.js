'use strict';
angular.module('portfolio').controller('portfolioAlertCtrl', ['$scope', 'mwAlertService', 'PPconfig', function($scope, mwAlertService, PPconfig){
	$scope.github_link = PPconfig.github+'mw-alert';
	$scope.message = {};
	$scope.message.type = 'success';
	$scope.open = function(){
		$scope.message.close_auto = false;
		mwAlertService.open($scope.message);
	};
}]);