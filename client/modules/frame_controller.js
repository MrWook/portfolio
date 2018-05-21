angular.module('portfolio-menu', [
	'portfolio-config',
	'portfolio-services'
]);
angular.module('portfolio-menu').controller('MenuCtrl',['$scope', '$rootScope', 'PPconfig', function($scope, $rootScope, PPconfig){
	$scope.menu = PPconfig.menu;
	$scope.path = PPconfig.path;
	//set index for the active class
	$scope.index = 0;
	$rootScope.$on('change_site', function(obj, index){
		$scope.index = index[0];
	});
}]);

angular.module('portfolio-menu').controller('FooterCtrl',['$scope', '$rootScope', 'PPconfig', 'PPHelper', function($scope, $rootScope, PPconfig, PPHelper){
	$scope.path = PPconfig.path;
	$scope.languages = [
		'de_DE',
		'en_US'
	];

	$scope.changeLang = function(language){
		PPHelper.change_language(language);
	};
}]);

angular.module('portfolio-menu').controller('MainCtrl',['$scope', 'PPconfig', function($scope, PPconfig){
	$scope.path = PPconfig.path;
}]);
