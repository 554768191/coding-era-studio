'use strict';

// Config HTTP Error Handling
angular.module('user').run([
    'Menus',
    function (Menus) {
        var userMenu = Menus.genMenu({name:'管理', subTitle:'管理后台设置', icon:'cog', route: 'usersManage'});
        userMenu.setOrder(99);
        Menus.addMenus(userMenu.getMenus());
    }
]).config(['$httpProvider', '$stateProvider',
    function ($httpProvider, $stateProvider) {

        // Users state routing
        $stateProvider
            // 用户管理
            .state('usersManage', {
                url: '/user',
                templateUrl: 'modules/user/views/user-manage.client.view.html',
                controller: 'usersManageCtrl',
                secured:"hasPermission('article','read')"
            })
            .state('usersManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/user/views/user-list.client.view.html',
            })
            .state('usersManage.edit', {
                url: '/edit?:username',
                templateUrl: 'modules/user/views/user-profile.client.view.html',
                controller:'UserProfileController'
            })
            // 个人信息
            .state('usersManage.profile', {
                url: '/profile',
                templateUrl: 'modules/user/views/user-profile.client.view.html',
                controller:'UserProfileController',
                secured:"hasPermission('article','read')"
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
                controller:'userRolesEditCtrl'
            })

            // 角色管理
            .state('usersManage.rolesManage', {
                url: '/role',
                templateUrl: 'modules/user/views/permission/user-role-list.client.view.html',
                secured:"hasPermission('article','read1')"
            })
            .state('usersManage.rolesManage.edit', {
                url: '/edit?:roleId',
                templateUrl: 'modules/user/views/permission/user-role-edit.client.view.html',
                controller:'userRoleEditCtrl'
            })
            .state('usersManage.rolesManage.permissions', {
                url: '/permissions/edit?:roleId',
                templateUrl: 'modules/user/views/permission/user-role-permissions-edit.client.view.html',
                controller:'userRolePermissionsEditCtrl'
            })
            // 资源管理
            .state('usersManage.resourcesManage', {
                url: '/resources',
                templateUrl: 'modules/user/views/permission/user-resource-list.client.view.html'
            })
            .state('usersManage.resourcesManage.edit', {
                url: '/edit?:resourceId',
                templateUrl: 'modules/user/views/permission/user-resource-edit.client.view.html',
                controller:'userResourceEditCtrl'
            })
            // 权限管理
            .state('usersManage.permissionsManage', {
                url: '/permissions',
                templateUrl: 'modules/user/views/permission/user-permission-list.client.view.html',
                secured:"hasPermission('article','read')"
            })
            .state('usersManage.permissionsManage.edit', {
                url: '/edit?:permissionId',
                templateUrl: 'modules/user/views/permission/user-permission-edit.client.view.html',
                controller:'userPermissionEditCtrl',
                secured:"hasPermission('article','read1')"
            })

            // 重置密码
            .state('usersManage.resetPassword', {
                url: '/password/reset/:token',
                templateUrl: '/modules/user/views/user-reset-password.client.view.html',
                controller:'PasswordController'
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
        $httpProvider.interceptors.push([
            '$q', '$window', '$location','$log', 'Authentication',
            function ($q, $window, $location,$log, Authentication) {
                return {
                    responseError: function (rejection) {
                        //TODO JASON 浏览器报 No 'Access-Control-Allow-Origin' header is present on the requested resource. 的时候获取不到status状态
                        $log.debug('rejection.status', rejection);
                        $log.debug('rejection.status', rejection.status);
                        switch (rejection.status) {
                            case -1:
                                //$window.location.href = '/auth/provider/refreshToken';
                                Authentication.user = null;
                                break;
                            case 401:
                                // Deauthenticate the global user
                                Authentication.user = null;
                                // Redirect to signin page
                                $location.path('signin');
                                break;
                            case 403:
                                // Add unauthorized behaviour
                                break;
                        }
                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
]);