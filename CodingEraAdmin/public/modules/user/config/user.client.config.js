'use strict';

// Config HTTP Error Handling
angular.module('user').run([
    'Menus',
    function (Menus) {
        var userMenu = Menus.genMenu({
            name:'管理', subTitle:'管理后台设置', icon:'cog', route: 'usersManage'
        });
        userMenu.setOrder(99);
        Menus.addMenus(userMenu.getMenus());
    }
]).config(['$provide', '$httpProvider', '$stateProvider',
    function ($provide, $httpProvider, $stateProvider) {

        // Users state routing
        $stateProvider
            // 用户管理
            .state('usersManage', {
                url: '/user',
                templateUrl: 'modules/user/views/user-manage.client.view.html',
                controller: 'usersManageCtrl'
            })
            .state('usersManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/user/views/user-list.client.view.html',
                secured:"hasPermission('user','read')"
            })
            .state('usersManage.edit', {
                url: '/edit?:username',
                templateUrl: 'modules/user/views/user-profile.client.view.html',
                controller:'UserProfileController',
                secured:"hasPermission('user','write')"
            })
            // 个人信息
            .state('usersManage.profile', {
                url: '/profile',
                templateUrl: 'modules/user/views/user-profile.client.view.html',
                controller:'UserProfileController'
            })
            // 个人信息 -> 修改头像
            .state('usersManage.avatar', {
                url: '/profile',
                templateUrl: 'modules/user/views/user-profile-avatar-edit.client.view.html',
                controller:'SettingsAvatarController'
            })
            // 用户所属角色管理
            .state('usersManage.roles', {
                url: '/roles/edit?:userId',
                templateUrl: 'modules/user/views/user-roles-edit.client.view.html',
                controller:'userRolesEditCtrl',
                secured:"hasPermission('user','write')"
            })

            // 角色管理
            .state('usersManage.rolesManage', {
                url: '/role',
                templateUrl: 'modules/user/views/permission/user-role-list.client.view.html',
                secured:"hasPermission('user','read')"
            })
            .state('usersManage.rolesManage.edit', {
                url: '/edit?:roleId',
                templateUrl: 'modules/user/views/permission/user-role-edit.client.view.html',
                controller:'userRoleEditCtrl',
                secured:"hasPermission('user','write')"
            })
            .state('usersManage.rolesManage.permissions', {
                url: '/permissions/edit?:roleId',
                templateUrl: 'modules/user/views/permission/user-role-permissions-edit.client.view.html',
                controller:'userRolePermissionsEditCtrl',
                secured:"hasPermission('user','write')"
            })
            // 资源管理
            .state('usersManage.resourcesManage', {
                url: '/resources',
                templateUrl: 'modules/user/views/permission/user-resource-list.client.view.html',
                secured:"hasPermission('user','read')"
            })
            .state('usersManage.resourcesManage.edit', {
                url: '/edit?:resourceId',
                templateUrl: 'modules/user/views/permission/user-resource-edit.client.view.html',
                controller:'userResourceEditCtrl',
                secured:"hasPermission('user','write')"
            })
            // 权限管理
            .state('usersManage.permissionsManage', {
                url: '/permissions',
                templateUrl: 'modules/user/views/permission/user-permission-list.client.view.html',
                secured:"hasPermission('user','read')"
            })
            .state('usersManage.permissionsManage.edit', {
                url: '/edit?:permissionId',
                templateUrl: 'modules/user/views/permission/user-permission-edit.client.view.html',
                controller:'userPermissionEditCtrl',
                secured:"hasPermission('user','write')"
            })

            // 重置密码
            .state('usersManage.resetPassword', {
                url: '/password/reset/:token',
                templateUrl: '/modules/user/views/user-reset-password.client.view.html',
                controller:'PasswordController',
                secured:"hasPermission('user','write')"
            })

            //公众页面 重置密码
            .state('resetPassword', {
                url: '/password/reset/:token',
                templateUrl: '/modules/user/views/open/user-reset-password.client.view.html',
                controller:'OpenPasswordController'
            })

            // 无访问权限跳转页面
            // 注意:templateUrl前加上/,使http://localhost:3000/open/#!/页面也可以读取该页面
            .state('unauthorized', {
                url: '/unauthorized',
                templateUrl: '/modules/user/views/user-unauthorized.client.view.html'
            });


        // Set the httpProvider "not authorized" interceptor
        //$httpProvider.interceptors.push([
        //    '$q', '$window', '$location','$log', 'Authentication',
        //    function ($q, $window, $location,$log, Authentication) {
        //        return {
        //            responseError: function (rejection) {
        //                //TODO JASON 浏览器报 No 'Access-Control-Allow-Origin' header is present on the requested resource. 的时候获取不到status状态
        //                $log.debug('rejection.status', rejection);
        //                $log.debug('rejection.status', rejection.status);
        //                switch (rejection.status) {
        //                    case -1:
        //                        //$window.location.href = '/auth/provider/refreshToken';
        //                        Authentication.user = null;
        //                        break;
        //                    case 401:
        //                        // Deauthenticate the global user
        //                        Authentication.user = null;
        //                        // Redirect to signin page
        //                        $location.path('signin');
        //                        break;
        //                    case 403:
        //                        // Add unauthorized behaviour
        //                        break;
        //                }
        //                return $q.reject(rejection);
        //            }
        //        };
        //    }
        //]);

        // 将服务注册到拦截器链中
        $httpProvider.interceptors.push('myHttpInterceptor');
        // 注册一个拦截器服务
        $provide.factory('myHttpInterceptor', [
            '$q', '$log', 'Authentication',
            function($q, $log, Authentication) {
                return {
                    // 可选方法
                    'request': function(config) {
                        //$log.debug('request', config);
                        // 请求成功后处理

                        //TODO Jason 还没有加弹性配置token
                        var token = Authentication.user.accessToken || "none";
                        config.headers.Authorization = 'Bearer ' + token;
                        return config;
                    },
                    // 可选方法
                    'requestError': function(rejection) {
                        //$log.debug('requestError rejection.status', rejection.status);
                        // 请求失败后的处理
                        //if (canRecover(rejection)) {
                        //    return responseOrNewPromise
                        //}
                        return $q.reject(rejection);
                    },
                    // 可选方法
                    'response': function(response) {
                        // 返回回城处理
                        return response || $q.when(response);
                    },
                    // 可选方法
                    'responseError': function(rejection) {
                        $log.debug('responseError rejection.status', rejection.status);
                        // 返回失败的处理
                        //if (canRecover(rejection)) {
                        //    return responseOrNewPromise
                        //}
                        return $q.reject(rejection);
                    }
                };
            }
        ]);

        $httpProvider.defaults.withCredentials = true;

    }
]);