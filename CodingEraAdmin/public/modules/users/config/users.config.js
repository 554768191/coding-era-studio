'use strict';

// Config HTTP Error Handling
angular.module('users').run([
    'Menus',
    function (Menus) {
        var userMenu = Menus.genMenu({name: '用户', icon: 'user',route: 'usersManage'});
        userMenu.setOrder(99);
        //userMenu.addNodeMenus(node_users);
        Menus.addMenus(userMenu.getMenus());
    }
]).config(['$httpProvider', '$stateProvider',
    function ($httpProvider, $stateProvider) {

        // Users state routing
        $stateProvider
            .state('usersManage', {
                url: '/users',
                templateUrl: 'modules/users/views/users.manage.view.html',
                controller: 'usersManageCtrl'
            })
            .state('usersManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/users/views/users.list.view.html',
            })
            .state('usersManage.edit', {
                url: '/edit?:userId',
                templateUrl: 'modules/users/views/settings/users.profile.view.html',
                controller:'SettingsController'
            })
            //个人信息
            .state('usersManage.profile', {
                url: '/settings/profile',
                templateUrl: 'modules/users/views/settings/users.profile.view.html',
                controller:'SettingsController'
            })
            .state('password', {
                url: '/settings/password',
                templateUrl: 'modules/users/views/settings/users.change-password.view.html'
            })
            .state('accounts', {
                url: '/settings/accounts',
                templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
            })
            .state('signup', {
                url: '/user/signup',
                templateUrl: 'modules/users/views/authentication/users.signup.view.html'
            })
            .state('signin', {
                url: '/user/signin',
                templateUrl: 'modules/users/views/authentication/users.signin.view.html'
            })
            .state('forgot', {
                url: '/password/forgot',
                templateUrl: 'modules/users/views/password/users.forgot-password.view.html'
            })
            .state('reset-invalid', {
                url: '/password/reset/invalid',
                templateUrl: 'modules/users/views/password/users.reset-password-invalid.view.html'
            })
            .state('reset-success', {
                url: '/password/reset/success',
                templateUrl: 'modules/users/views/password/users.reset-password-success.view.html'
            })
            .state('reset', {
                url: '/password/reset/:token',
                templateUrl: 'modules/users/views/password/users.reset-password.view.html'
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