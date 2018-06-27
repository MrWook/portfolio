'use strict';
angular.module('portfolio').controller('ExperienceCtrl',['$scope', function($scope){

	$scope.skills = [
		{
			name : 'EXPERIENCE_BEGINNER',
			value: 0
		},
		{
			name : 'EXPERIENCE_BASIC',
			value: 33
		},
		{
			name : 'EXPERIENCE_INTERMEDIATE',
			value: 66
		},
		{
			name : 'EXPERIENCE_EXPERT',
			value: 100
		}
	];


	$scope.barchart_data = [
		{
			name: 'HTML5',
			value: 75
		},
		{
			name: 'CSS3,SASS',
			value: 68
		},
		{
			name: 'javascript',
			value: 68
		},
		{
			name: 'angularjs',
			value: 80
		},
		{
			name: 'jquery',
			value: 65
		},
		{
			name: 'nodejs',
			value: 30
		},
		{
			name: 'php',
			value: 76
		},
		{
			name: 'mysql',
			value: 72
		},
		{
			name: 'mongodb',
			value: 30
		},
		{
			name: 'apache',
			value: 40
		},
		{
			name: 'nginx',
			value: 30
		},
		{
			name: 'linux',
			value: 45
		},
		{
			name: 'PHPStorm',
			value: 60
		},
	];

	$scope.barchart_width = 100/$scope.barchart_data.length/2;

}]);
