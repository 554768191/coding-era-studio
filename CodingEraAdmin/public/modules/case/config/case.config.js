/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .value('path','modules/case')
    .run(['Menus',
    function(Menus) {
        //DEMO
        var caseMenu=Menus.genParentMenus({name:'作品',icon:'th-large'});
        var node_case_list=Menus.genNodeMenus({name:'作品管理',subTitle:'管理作品列表',route:'caseManage'});
        caseMenu.setOrder(-1);
        caseMenu.addNodeMenus(node_case_list);
        Menus.addMenus(caseMenu.getMenus());

        //控件库



    }
]).config(['$stateProvider','$translatePartialLoaderProvider',
    function($stateProvider,$translatePartialLoaderProvider) {

        //国际化
        $translatePartialLoaderProvider.addPart('case');
        $stateProvider
            .state('caseManage', {
                url: '/case',
                templateUrl: 'modules/case/views/case.manage.view.html',
                controller:'caseManageCtrl'
            })
            .state('caseManage.publish', {
                url: '/publish',
                templateUrl: 'modules/case/views/case.publish.view.html',
                controller:'casePublishCtrl'
            })
            .state('caseManage.list', {
                url: '/list',
                templateUrl: 'modules/case/views/case.list.view.html',
                controller:'caseListCtrl'
            });


    }
]);