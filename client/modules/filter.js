angular.module('portfolio-filter', []);

angular.module('portfolio-filter').filter('localizeMonth', ['$interpolate', function($interpolate){
	return function localizeMonth(input){
		return input
			.replace(/JANUARY/g, $interpolate('{{ \'MONTH_JANUARY\'   | translate}}'))
			.replace(/FEBRUARY/g, $interpolate('{{ \'MONTH_FEBRUARY\'  | translate}}'))
			.replace(/MARCH/g, $interpolate('{{ \'MONTH_MARCH\'     | translate}}'))
			.replace(/APRIL/g, $interpolate('{{ \'MONTH_APRIL\'     | translate}}'))
			.replace(/MAY/g, $interpolate('{{ \'MONTH_MAY\'       | translate}}'))
			.replace(/JUNE/g, $interpolate('{{ \'MONTH_JUNE\'      | translate}}'))
			.replace(/JULY/g, $interpolate('{{ \'MONTH_JULY\'      | translate}}'))
			.replace(/AUGUST/g, $interpolate('{{ \'MONTH_AUGUST\'    | translate}}'))
			.replace(/SEPTEMBER/g, $interpolate('{{ \'MONTH_SEPTEMBER\' | translate}}'))
			.replace(/OCTOBER/g, $interpolate('{{ \'MONTH_OCTOBER\'   | translate}}'))
			.replace(/NOVEMBER/g, $interpolate('{{ \'MONTH_NOVEMBER\'  | translate}}'))
			.replace(/DECEMBER/g, $interpolate('{{ \'MONTH_DECEMBER\'  | translate}}'))
			;
	};
}]);