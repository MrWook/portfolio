'use strict';
angular.module('portfolio').controller('portfolioLoaderCtrl', ['$scope', '$rootScope', 'PPconfig', function($scope, $rootScope, PPconfig){
	$scope.github_link = PPconfig.github+'mw-loader';
	$scope.loader_start = function(){
		$rootScope.$broadcast('mw-loader-on');
	};

	$scope.loader_stop = function(){
		$rootScope.$broadcast('mw-loader-off');
	};
}]);