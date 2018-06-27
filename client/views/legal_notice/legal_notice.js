'use strict';
angular.module('portfolio').controller('LegalNoticeCtrl',['$scope', 'PPconfig', function($scope, PPconfig){
	$scope.model = PPconfig.contact_data;
}]);
