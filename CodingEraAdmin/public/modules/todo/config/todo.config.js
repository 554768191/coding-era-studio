/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('todo').run(['Menus',
    function (Menus) {
        // Menus.addMenus();
        var parentMenus = Menus.genParentMenus({name:'JASON的基地', icon:'check', isPublic:false, roles:'JASON'});
        var jason1 = Menus.genNodeMenus({name:'TODO', icon:'tasks', route:'todo', isPublic:true});
        var jason2 = Menus.genNodeMenus({name:'GitHub Search', icon:'search', route:'search'});
        var jason3 = Menus.genNodeMenus({name:'计时器', icon:'time', route:'timer'});
        var jason4 = Menus.genNodeMenus({name:'精要指令', icon:'king', route:'directiveKing'});
        var jason5 = Menus.genNodeMenus({name:'文件上传', icon:'file', route:'fileUpload'});
        var jason6 = Menus.genNodeMenus({name:'用户指引', icon:'file', route:'training'});
        parentMenus.setOrder(99);
        parentMenus.addNodeMenus(jason1);
        parentMenus.addNodeMenus(jason2);
        parentMenus.addNodeMenus(jason3);
        parentMenus.addNodeMenus(jason4);
        parentMenus.addNodeMenus(jason5);
        parentMenus.addNodeMenus(jason6);
        Menus.addMenus(parentMenus.getMenus());

        console.log('Jason test parentMenus', parentMenus.getMenus());
    }
]).config(['$stateProvider','$translatePartialLoaderProvider',
    function ($stateProvider,$translatePartialLoaderProvider) {
        //国际化
        $translatePartialLoaderProvider.addPart('todo');
        //
        $stateProvider
            .state('todo', {
                url: '/todo',
                templateUrl: 'modules/todo/views/todo.view.html',
                controller: 'todoCtrl'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'modules/todo/views/todo.search.view.html',
                controller: 'searchCtrl'
            })
            .state('timer', {
                url: '/timer',
                templateUrl: 'modules/todo/views/todo.timer.view.html',
                controller: 'timerCtrl'
            })
            .state('directiveKing', {
                url: '/directiveKing',
                templateUrl: 'modules/todo/views/todo.directive.king.view.html',
                controller: 'directiveKingCtrl'
            })
            .state('fileUpload', {
                url: '/fileUpload',
                templateUrl: 'modules/todo/views/todo.fileUpload.view.html',
                controller: 'fileUploadCtrl'
            })
            .state('training', {
                url: '/training',
                templateUrl: 'modules/todo/views/todo.training.view.html',
                controller: 'trainingCtrl'
            });
    }
]);