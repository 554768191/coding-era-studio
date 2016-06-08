/**
 * Created by Yan on 15/12/3.
 */
'use strict';

angular.module('core').run([
    function() {

    }
]).config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            // 无访问权限跳转页面
            .state('unauthorized', {
                url: '/unauthorized',
                templateUrl: 'modules/core/views/core-unauthorized.client.view.html'
            });
    }
]);