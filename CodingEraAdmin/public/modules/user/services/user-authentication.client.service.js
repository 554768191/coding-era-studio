'use strict';

// Authentication service for user variables
angular.module('user').factory('Authentication', [
	'$rootScope', '$window', '$log', '$parse',
	function($rootScope,$window,$log, $parse) {

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
		},
		hasRole: function (role) {
			// todo Jason hasRole权限表达式未写
			return  false;
		},
		validExpression: function (expression) {
			//执行权限表达式返回结果,expression可以使hasPermission()或者hasRole()
			if(angular.isUndefined(expression)){
				return true;
			}

			if(!_.isString(expression))
				throw "security expression value must be a string :" + expression;

			expression = _.trim(expression);
			var notPermissionFlag = expression[0] === '!';
			if(notPermissionFlag) {
				expression = expression.slice(1).trim();
			}

			var hasPermission = $parse(expression)(this);
			return hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag;
		}
	};

	$log.debug("login user", auth);
	return auth;
}]);
