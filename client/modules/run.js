'use strict';
angular.module('portfolio-run', []);

angular.module('portfolio-run').run(['$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout){
	//bind resize event with debounce
	let debounce      = null;
	let window_size   = $window.innerWidth;
	$rootScope.mobile = window_size <= 650;
	angular.element($window).bind('resize', function(){
		if(debounce !== null){
			$timeout.cancel(debounce);
		}
		debounce = $timeout(function(){
			window_size       = $window.innerWidth;
			$rootScope.mobile = window_size <= 650;
			$rootScope.$broadcast('window_resize', window_size);
			debounce = null;
		}, 100);
		debounce.catch(function(){
		});
	});
}]);
