/**
 * Created by Yan on 15/12/3.
 */
'use strict';

angular.module('core').run([
    function() {

    }
]).config(['$provide', '$httpProvider', '$stateProvider',
    function ($provide, $httpProvider, $stateProvider) {

        // Core state routing
        $stateProvider
            // 无访问权限跳转页面
            // 注意:templateUrl前加上/,使http://localhost:3000/open/#!/页面也可以读取该页面
            .state('unauthorized', {
                url: '/unauthorized',
                templateUrl: '/modules/core/views/core-unauthorized.client.view.html'
            });

        // 将服务注册到拦截器链中
        $httpProvider.interceptors.push('myHttpInterceptor');
        // 注册一个拦截器服务
        $provide.factory('myHttpInterceptor', [
            '$q', '$log', 'Authentication',
            function($q, $log, Authentication) {
                return {
                    'request': function(config) {
                        //$log.debug('request', config);
                        // 请求成功后处理

                        //TODO Jason 还没有加弹性配置token
                        var token = Authentication.user.accessToken || "none";
                        config.headers.Authorization = 'Bearer ' + token;
                        return config;
                    },
                    'requestError': function(rejection) {
                        // 请求失败后的处理
                        //if (canRecover(rejection)) {
                        //    return responseOrNewPromise
                        //}
                        return $q.reject(rejection);
                    },
                    'response': function(response) {
                        return response || $q.when(response);
                    },
                    'responseError': function(rejection) {
                        $log.debug('responseError rejection.status', rejection.status);
                        // 返回失败的处理
                        //浏览器报 No 'Access-Control-Allow-Origin' header is present on the requested resource. 的时候获取不到status状态
                        //已经修复,原因是Chrome浏览器在AJAX请求前，会发送OPTIONS请求测试服务器的CORS.已经修改服务器配置
                        // Set the httpProvider "not authorized" interceptor
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
                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
]);