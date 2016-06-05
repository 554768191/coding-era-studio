/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('todo').run(['Menus',
    function (Menus) {
        // Menus.addMenus();
        var parentMenus = Menus.genMenu({name:'JASON的基地', icon:'check', isPublic:false, roles:'JASON',route:"jason"});
        //var jason1 = Menus.genNodeMenus({name:'TODO', icon:'tasks', route:'todo', isPublic:true});
        //var jason2 = Menus.genNodeMenus({name:'GitHub Search', icon:'search', route:'search'});
        //var jason3 = Menus.genNodeMenus({name:'计时器', icon:'time', route:'timer'});
        //var jason4 = Menus.genNodeMenus({name:'精要指令', icon:'king', route:'directiveKing'});
        //var jason5 = Menus.genNodeMenus({name:'文件上传', icon:'file', route:'fileUpload'});
        //var jason6 = Menus.genNodeMenus({name:'用户指引', icon:'file', route:'training'});
        parentMenus.setOrder(999);
        //parentMenus.addNodeMenus(jason1);
        //parentMenus.addNodeMenus(jason2);
        //parentMenus.addNodeMenus(jason3);
        //parentMenus.addNodeMenus(jason4);
        //parentMenus.addNodeMenus(jason5);
        //parentMenus.addNodeMenus(jason6);
        Menus.addMenus(parentMenus.getMenus());
    }
]).config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('jason', {
                url: '/jason',
                templateUrl: 'modules/todo/views/todo-manage.client.view.html',
                controller: 'todoManageCtrl'
            })
            .state('jason.todo', {
                url: '/todo',
                templateUrl: 'modules/todo/views/todo.client.view.html',
                controller: 'todoCtrl'
            })
            .state('jason.search', {
                url: '/search',
                templateUrl: 'modules/todo/views/todo-search.client.view.html',
                controller: 'searchCtrl'
            })
            .state('jason.timer', {
                url: '/timer',
                templateUrl: 'modules/todo/views/todo-timer.client.view.html',
                controller: 'timerCtrl'
            })
            .state('jason.directiveKing', {
                url: '/directiveKing',
                templateUrl: 'modules/todo/views/todo-directive-king.client.view.html',
                controller: 'directiveKingCtrl'
            })
            .state('jason.fileUpload', {
                url: '/fileUpload',
                templateUrl: 'modules/todo/views/todo-file-upload.client.view.html',
                controller: 'fileUploadCtrl'
            })
            .state('jason.training', {
                url: '/training',
                templateUrl: 'modules/todo/views/todo-training.client.view.html',
                controller: 'trainingCtrl'
            });
    }
]);