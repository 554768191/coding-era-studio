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
            });
    }
]);