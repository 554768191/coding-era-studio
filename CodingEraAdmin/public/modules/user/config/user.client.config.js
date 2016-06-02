'use strict';

// Config HTTP Error Handling
angular.module('user').run([
    'Menus',
    function (Menus) {
        var userMenu = Menus.genMenu({name: '管理',subTitle:'管理后台设置', icon: 'cog',route: 'usersManage'});
        userMenu.setOrder(99);
        //userMenu.addNodeMenus(node_users);
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
                controller: 'usersManageCtrl'
            })
            .state('usersManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/user/views/user-list.client.view.html',
            })
            .state('usersManage.edit', {
                url: '/edit?:userId',
                templateUrl: 'modules/user/views/user-profile.client.view.html',
                controller:'UserProfileController'
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


            // 角色管理
            .state('usersManage.rolesManage', {
                url: '/role',
                templateUrl: 'modules/user/views/user-role-list.client.view.html'
            })
            .state('usersManage.rolesManage.edit', {
                url: '/edit?:roleId',
                templateUrl: 'modules/user/views/user-role-edit.client.view.html',
                controller:'userRoleEditCtrl'
            })
            // 资源管理
            .state('usersManage.resourcesManage', {
                url: '/resources',
                templateUrl: 'modules/user/views/user-resource-list.client.view.html'
            })
            .state('usersManage.resourcesManage.edit', {
                url: '/edit?:resourceId',
                templateUrl: 'modules/user/views/user-resource-edit.client.view.html',
                controller:'userResourceEditCtrl'
            })
            // 权限管理
            .state('usersManage.permissionsManage', {
                url: '/permissions',
                templateUrl: 'modules/user/views/user-permission-list.client.view.html'
            })
            .state('usersManage.permissionsManage.edit', {
                url: '/edit?:permissionId',
                templateUrl: 'modules/user/views/user-permission-edit.client.view.html',
                controller:'userPermissionEditCtrl'
            })


            //下面这堆好像没用,到时问Jason   by Yason
            .state('password', {
                url: '/password',
                templateUrl: 'modules/user/views/user-change-password.client.view.html'
            })
            .state('accounts', {
                url: '/accounts',
                templateUrl: 'modules/user/views/social-accounts.client.view.html'
            })
            .state('signup', {
                url: '/user/signup',
                templateUrl: 'modules/user/views/user-signup.client.view.html'
            })
            .state('signin', {
                url: '/user/signin',
                templateUrl: 'modules/user/views/user-signin.client.view.html'
            })
            .state('forgot', {
                url: '/password/forgot',
                templateUrl: 'modules/user/views/user-forgot-password.client.view.html'
            })
            .state('reset-invalid', {
                url: '/password/reset/invalid',
                templateUrl: 'modules/users/views/user-reset-password-invalid.client.view.html'
            })
            .state('reset-success', {
                url: '/password/reset/success',
                templateUrl: 'modules/user/views/user-reset-password-success.client.view.html'
            })
            .state('reset', {
                url: '/password/reset/:token',
                templateUrl: 'modules/user/views/user-reset-password.client.view.html'
            });
            //.state('users', {
            //    url: '/users',
            //    templateUrl: 'modules/users/views/users.list.view.html'
            //});

        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$window', '$location', 'Authentication',
            function ($q, $window, $location, Authentication) {
                return {
                    responseError: function (rejection) {
                        console.log('rejection.status', rejection.status);
                        switch (rejection.status) {
                            case -1:
                                $window.location.href = '/auth/provider/refreshToken';
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