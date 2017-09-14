'use strict';
angular.module('portfolio').controller('ContactCtrl',['$scope', '$http', function($scope, $http){
	$scope.model= {};
	//send the message if the form is valid
	$scope.send = function(){
		if($scope.form.$valid){
			$http.put('/contact', $scope.model)
				.then(function(response) {
					//show appropriate info
					$scope.message = {};
					$scope.message.type = response.data.type;
					$scope.message.text = response.data.text;
				});
		}
	};

	//close alert window
	$scope.closeAlert = function() {
		$scope.message = undefined;
	};
}]);
