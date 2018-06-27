'use strict';
angular.module('portfolio').controller('phpErrorHandlerCtrl',['$scope', '$http', 'PPconfig', function($scope, $http, PPconfig) {
	$scope.github_link = PPconfig.github+'php-error-handler';
	$scope.error = {};
	$scope.timeout_in_progress = false;
	$scope.click = function(type){
		if(type == 'timeout')
			$scope.timeout_in_progress = true;
		$http.post('/php_error', {type: type})
			.then(function(response) {
				//show appropriate info
				$scope.message = {};
				$scope.message.type = response.data.type;
				$scope.message.text = response.data.text;
				$scope.message.data = response.data.data;
				$scope.timeout_in_progress = false;
			});
	};

	//close alert window
	$scope.closeAlert = function() {
		$scope.message = undefined;
	};
}]);