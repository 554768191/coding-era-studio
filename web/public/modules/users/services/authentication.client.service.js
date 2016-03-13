'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var user = $window.user || null;
	var userJson = (Object.prototype.toString.call(user) === "[object String]") ? angular.fromJson(user) : user;
	var auth = {
		user: userJson
	};
	
	return auth;
}]);
