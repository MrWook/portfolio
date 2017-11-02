'use strict';
const datePickerRange = angular.module('datePickerRange', [
	'ui.bootstrap',
	'mw-datepicker-range'
]);

datePickerRange.controller('DatePickerRangeCtrl',['$scope', 'mwMultiSelectService', function($scope, mwMultiSelectService) {

	//datepicker range popup
	$scope.activeDate = null;
	$scope.selectedDates = [];
	$scope.open = function() {
		$scope.opened = true;
	};
	$scope.opened = false;
	$scope.options = {
		minDate:new Date()
	};
	$scope.parsed_date = {};

	//datepicker range
	$scope.activeDate3 = null;
	$scope.selectedDates3 = [new Date().setHours(0, 0, 0, 0)];
	$scope.options3 = {
		startingDay:1,
		minDate:new Date()
	};
	$scope.parsed_date2 = {};
	//datepicker
	$scope.activeDate4 = null;
	$scope.options4 = {
		startingDay:1,
		minDate:new Date()
	};

	$scope.parse_date = function(){
		"use strict";
		$scope.parsed_date = mwMultiSelectService.parse($scope.selectedDates, 'dd.MM.y');
		$scope.parsed_date2 = mwMultiSelectService.parse($scope.selectedDates3);
	};

}]);

datePickerRange.filter('localizeMonth',['$interpolate', function($interpolate){
	return function localizeMonth(input){
		return input
			.replace(/JANUARY/g,   $interpolate('{{ \'MONTH_JANUARY\'   | translate}}'))
			.replace(/FEBRUARY/g,  $interpolate('{{ \'MONTH_FEBRUARY\'  | translate}}'))
			.replace(/MARCH/g,     $interpolate('{{ \'MONTH_MARCH\'     | translate}}'))
			.replace(/APRIL/g,     $interpolate('{{ \'MONTH_APRIL\'     | translate}}'))
			.replace(/MAY/g,       $interpolate('{{ \'MONTH_MAY\'       | translate}}'))
			.replace(/JUNE/g,      $interpolate('{{ \'MONTH_JUNE\'      | translate}}'))
			.replace(/JULY/g,      $interpolate('{{ \'MONTH_JULY\'      | translate}}'))
			.replace(/AUGUST/g,    $interpolate('{{ \'MONTH_AUGUST\'    | translate}}'))
			.replace(/SEPTEMBER/g, $interpolate('{{ \'MONTH_SEPTEMBER\' | translate}}'))
			.replace(/OCTOBER/g,   $interpolate('{{ \'MONTH_OCTOBER\'   | translate}}'))
			.replace(/NOVEMBER/g,  $interpolate('{{ \'MONTH_NOVEMBER\'  | translate}}'))
			.replace(/DECEMBER/g,  $interpolate('{{ \'MONTH_DECEMBER\'  | translate}}'))
			;
	};
}]);