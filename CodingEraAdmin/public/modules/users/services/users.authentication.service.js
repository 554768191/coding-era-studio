'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window','$log', function($window,$log) {
	var user = $window.user || null;
	var auth = {
		user: user,
		apiURL: $window.apiURL
	};
	$log.debug("login user", auth);
	return auth;
}]);
