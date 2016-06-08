'use strict';

// Authentication service for user variables
angular.module('user').factory('Authentication', [
	'$rootScope', '$window', '$log',
	function($rootScope,$window,$log) {

	var user = $window.user || null;
	//如果头像为空,使用默认头像
	if(user.avatar === null || user.avatar === ''){
		user.avatar = '/modules/core/img/avatar.png';
	}

	var	permissionList = user.permissions;
	var _ = window._;

	var auth = {
		user: user,
		apiURL: $window.apiURL,
		setPermissions: function(permissions) {
			permissionList = permissions;
			$rootScope.$broadcast('permissionsChanged');
		},
		hasPermission: function (resource, permission) {
			resource = _.trim(resource);
			permission = _.trim(permission);
			console.log(resource);
			console.log(permission);
			return _.some(permissionList, function(item) {
				if(_.isString(item.resource) && _.trim(item.resource) === resource){
					if(_.isString(item.permission)){
						if((','+item.permission+',').indexOf(','+permission+',')>=0){
							return true;
						}
					}
				}
				return  false;
			});
		}
	};

	$log.debug("login user", auth);
	return auth;
}]);
