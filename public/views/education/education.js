'use strict';
angular.module('portfolio').controller('EducationCtrl',['$scope', function($scope){
	$scope.times = [
		{
			type: 0,
			name: 'GRADUATION',
			time: '2015-08-01'
		},
		{
			type: 0,
			name: 'APPRENTICESHIP',
			time: '2018-01-31'
		}
	];
}]);
