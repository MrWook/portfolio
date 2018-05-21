'use strict';
angular.module('portfolio').controller('portfolioLoaderCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.loader_start = function(){
		$rootScope.$broadcast('mw-loader-on');
	};

	$scope.loader_stop = function(){
		$rootScope.$broadcast('mw-loader-off');
	};
}]);