'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window','$log', function($window,$log) {
	var user = $window.user || null;
	//如果头像为空,使用默认头像
	if(user.avatar === null || user.avatar === ''){
		user.avatar = '/modules/core/img/avatar.png';
	}
	var auth = {
		user: user,
		apiURL: $window.apiURL
	};
	$log.debug("login user", auth);
	return auth;
}]);
