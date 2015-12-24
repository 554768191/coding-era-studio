/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('todo').config(['$stateProvider','$translatePartialLoaderProvider',
    function ($stateProvider,$translatePartialLoaderProvider) {
        //国际化
        $translatePartialLoaderProvider.addPart('todo');
        //
        $stateProvider
            .state('todo', {
                url: '/todo',
                templateUrl: 'modules/todo/views/todo.admin.view.html',
                controller: 'todoCtrl'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'modules/todo/views/search.admin.view.html',
                controller: 'searchCtrl'
            })
            .state('timer', {
                url: '/timer',
                templateUrl: 'modules/todo/views/timer.admin.view.html',
                controller: 'timerCtrl'
            })
            .state('directiveKing', {
                url: '/directiveKing',
                templateUrl: 'modules/todo/views/directive.king.admin.view.html',
                controller: 'directiveKingCtrl'
            });
    }
]);