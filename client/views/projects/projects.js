'use strict';
angular.module('portfolio').controller('ProjectsCtrl',['$scope', '$rootScope', function($scope, $rootScope){
	$scope.page = $rootScope.path;
	$scope.projects = [
		{
			id: 0,
			titel: 'Error messages',
			name: 'mw_error_messages',
			info: ''
		},
		{
			id: 1,
			titel: 'PHP error handler',
			name: 'php_error_handler',
			info: ''
		},
		{
			id: 2,
			titel: 'Range datepicker',
			name: 'mw_datepicker_range',
			info: ''
		},
		{
			id: 3,
			titel: 'Alert window',
			name: 'mw_alert',
			info: ''
		},
		{
			id: 4,
			titel: 'Loader spinner',
			name: 'mw_loader',
			info: ''
		}
	];
}]);
