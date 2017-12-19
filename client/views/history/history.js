'use strict';
angular.module('portfolio').controller('HistoryCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

	$http.post('/history', {}).then(function(response){
		$scope.career   = response.data.career;
		$scope.projects = response.data.projects;
		$scope.career   = positioning_init($scope.career);
		$scope.projects = positioning_init($scope.projects);

		$rootScope.$watch('mobile', function(value){
			$scope.career   = positioning_update($scope.career, value);
			$scope.projects = positioning_update($scope.projects, value);
		});
	});

	let positioning_init = function(array){
		let width = 100/array.length;
		for(let i = 0; i < array.length; i++){
			array[i].positioning = width*i+'%';
			if(array[i].style === undefined){
				array[i].style = {};
			}
			if($rootScope.mobile == true){
				array[i].style.height = width+'%';
				array[i].style.top    = array[i].positioning;
			}else{
				array[i].style.width = width+'%';
				array[i].style.left  = array[i].positioning;
			}
		}
		return array;
	};

	let positioning_update = function(array, mobile){
		let width = 100/array.length;
		if(mobile == true){
			for(let i = 0; i < array.length; i++){
				array[i].style = {
					height: width+'%',
					top:    array[i].positioning
				};
			}
		}else{
			for(let i = 0; i < array.length; i++){
				array[i].style = {
					width: width+'%',
					left:  array[i].positioning
				};
			}
		}
		return array;
	};

}]);
