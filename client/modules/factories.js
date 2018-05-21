'use strict';
angular.module('portfolio-factories', []);
//$exceptionHandler override to prevent error message in console and open error modal window
angular.module('portfolio-factories').factory('$exceptionHandler', ['$injector', '$log', '$window', function($injector, $log, $window) {

	//init the error variable with the error_level
	let errors = {error_level: 'E_CLIENT'};
	//set checked variable to check if there was an javascript error or an angular error
	let checked = false;
	/*
	 * onerror works like a global try...catch for javascript
	 *
	 */
	$window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
		//clear errors variable
		errors = {error_level: 'E_CLIENT'};
		checked = true;
		//the error variable is filled with the parameters from the onerror function
		errors.javascript = {};
		errors.javascript.file = url;
		errors.javascript.line = lineNumber;
		errors.javascript.column = column;
		errors.javascript.message = errorMsg;
		//open error modal window for the user
		log_error(errors);
	};

	return function myExceptionHandler(exception, cause) {
		"use strict";
		if(checked == false)
			errors = {error_level: 'E_CLIENT'};
		checked = false;
		//inject rootScope
		let rootScope = $injector.get("$rootScope");
		let exception_stack;
		// it is possible that the exception isn't a object but a string
		if(exception.stack !== undefined)
			exception_stack = exception.stack;
		else
			exception_stack = exception;

		//check for digest cycle error
		if(exception_stack.indexOf("$rootScope:infdig") !== -1){
			errors.infdig = true;
			errors.destination = {
				next: rootScope.globals.next,
				current: rootScope.globals.current
			};
			errors.cause = cause;
		}

		//ignore possibly unhandled rejection crap
		if(exception_stack.indexOf("Possibly unhandled rejection") == -1){
			//check if Authentication failed
			//if it fail the error code is 401
			if(exception_stack.indexOf("HTTP status: 401 Not Authenticated") === -1 && exception_stack.indexOf("Not%20Authenticated") === -1){
				let exeption_array = exception_stack.split("\n");
				errors.angular = {};
				errors.angular.complete_exception = exeption_array;
				log_error(errors);
			}else{
				log_error(401);
			}
			//check if debug is on
			//if it's on the error will be displayed in the console
			// if(rootScope.globals !== undefined && rootScope.globals.debug == 1)
				$log.error(exception, cause);
		}
	};
	//log the error
	function log_error(errors){
		let http = $injector.get("$http");
		let location = $injector.get("$location");
		http.put('log_error', {msg: errors, location: location.path().slice(1)})
			.then(function(response) {
			});
	}
}]);

angular.module('portfolio-factories').factory('httpInterceptor', ['$q', '$timeout', '$injector', '$rootScope', function($q, $timeout, $injector, $rootScope) {
	return {
		request: function(config) {
			if (config.data && typeof config.data === 'object') {
				config.data = $.param(config.data);
			}
			return config || $q.when(config);
		},
		responseError: function (rejection){
			return $q.reject(rejection);
		},
		response: function(response) {
			return response;
		}
	};
}]);