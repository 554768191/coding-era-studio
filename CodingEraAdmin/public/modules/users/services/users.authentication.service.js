'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var user = $window.user || null;
	var auth = {
		user: user
	};
	console.log("login user", auth);
	return auth;
}]);
