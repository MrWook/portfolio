'use strict';
const phpErrorHandler = angular.module('phpErrorHandler', []);

phpErrorHandler.controller('phpErrorHandlerCtrl',['$scope', '$http', function($scope, $http) {
	$scope.error = {};
	$scope.click = function(type){
		$http.post('/php_error', type)
			.then(function(response) {
				console.log(response);
				$scope.error = response.data;
			});
	}
}]);