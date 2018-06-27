'use strict';
angular.module('portfolio').controller('PrivacyPoliciesCtrl',['$scope', 'PPconfig', function($scope, PPconfig){
	$scope.model = PPconfig.contact_data;
}]);
