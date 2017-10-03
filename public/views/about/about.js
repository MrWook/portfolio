'use strict';
angular.module('portfolio').controller('AboutCtrl',['$scope', 'PPconfig', function($scope, PPconfig){
	$scope.image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=';

	function calculateAge(birthday){
		let ageDifMs = Date.now() - birthday.getTime();
		let ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	$scope.age = calculateAge(new Date(PPconfig.birthday));
}]);
