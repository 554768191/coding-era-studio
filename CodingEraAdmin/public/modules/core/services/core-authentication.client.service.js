'use strict';

// Authentication service for user variables
angular.module('core').factory('Authentication', [
		'$rootScope', '$window', '$log', '$parse','$injector',
		function($rootScope,$window,$log, $parse,$injector) {

		var _ = window._;
		var	permissionList;
		var user = $window.user || null;
		//如果头像为空,使用默认头像
		if(user){
			if(user.avatar === null || user.avatar === ''){
				user.avatar = '/modules/core/img/avatar.png';
			}
			permissionList = user.permissions;
		}

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
			hasRole: function (roles) {
				roles = roles || "*";
				if (user) {
					if (!!~(roles.indexOf('*'))) {
						return true;
					} else {
						var roleList = roles.split(",");
						for (var userRoleIndex in user.authorities) {
							for (var roleIndex in roleList) {
								if ("ROLE_"+roleList[roleIndex] === user.authorities[userRoleIndex].authority) {
									return true;
								}
							}
						}
					}
				}
				return false;
			},
			checkPermission: function (expression) {
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
			},
			isGuest:function(){
				if(auth.user.authorities[0].authority === 'ROLE_GUEST'){
					return true;
				}
				return false;
			},
			isNotGuest:function(callback){
				if(!auth.isGuest()){
					callback();
				}else{
					var ceUtil = $injector.get('ceUtil');
					ceUtil.toast('非常抱歉 ! 体验用户 , 暂时仅供体验 (ㄒoㄒ)~~');
				}
			}
		};

		$log.debug("login user", auth.user);
		//欢迎下千辛万苦进来的用户
		if(auth.user.authorities[0].authority === 'ROLE_GUEST'){

			var $uibModal = $injector.get('$uibModal');
			var modalInstance = $uibModal.open({
				animation: true,
				size:'md',
				templateUrl: '/modules/core/views/templates/core-welcome.client.template.html',
				controller:[
					'$scope','$uibModalInstance',
					function($scope,$uibModalInstance){
						$scope.cancel = function(){
							$uibModalInstance.dismiss('cancel');
						};
						$scope.ok = function(){
							$uibModalInstance.close();
							successCallback();
						};
					}
				]
			});
		}
		return auth;
}]);
