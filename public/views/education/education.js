'use strict';
angular.module('portfolio').controller('EducationCtrl',['$scope', '$rootScope', function($scope, $rootScope){
	$scope.career = [
		{
			name: 'GRADUATION',
			time: '2015-08-01',
		},
		{
			name: 'APPRENTICESHIP',
			time: '2018-01-31',
		}
	];

	$scope.projects = [
		{
			name: 'DYNAMIC_PDF',
			time: '2016-05-01',
		},
		{
			name: 'DYNAMIC_PDF_EDITOR',
			time: '2016-06-31',
		},
		{
			name: 'DYNAMIC_TABLES',
			time: '2016-11-31',
		},
		{
			name: 'MW_ERROR_MESSAGES',
			time: '2017-02-02',
		},
		{
			name: 'PHP_ERROR_HANDLER',
			time: '2017-07-03',
		},
		{
			name: 'MW_DATEPICKER_RANGE',
			time: '2017-08-13',
		},
		{
			name: 'PORTFOLIO',
			time: '2017-09-13',
		},
		{
			name: 'BRANDING_SYSTEM',
			time: '2017-10-24',
		}
	];

	let positioning_init = function(array){
		let width = 100/array.length;
		for(let i = 0; i < array.length; i++){
			array[i].positioning = width*i+'%';
			if(array[i].style === undefined){
				array[i].style = {};
			}
			if($rootScope.mobile == true){
				array[i].style.height =  width+'%';
				array[i].style.top = array[i].positioning;
			}else{
				array[i].style.width =  width+'%';
				array[i].style.left = array[i].positioning;
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
					top: array[i].positioning
				}
			}
		}else{
			for(let i = 0; i < array.length; i++){
				array[i].style = {
					width: width+'%',
					left: array[i].positioning
				}
			}
		}
		return array;
	};

	$scope.career = positioning_init($scope.career);
	$scope.projects = positioning_init($scope.projects);

	$rootScope.$watch('mobile', function(value){
		$scope.career = positioning_update($scope.career, value);
		$scope.projects = positioning_update($scope.projects, value);
	});

}]);
