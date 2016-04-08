/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .value('path','modules/case')
    .run(['Menus',
    function(Menus) {

        var caseMenu = Menus.genMenu({name: '案例',subTitle: '管理门户展示的作品', icon: 'th-large', route: 'caseManage'});
        caseMenu.setOrder(2);

        Menus.addMenus(caseMenu.getMenus());
    }
]).config([
    '$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('caseManage', {
                url: '/case',
                templateUrl: 'modules/case/views/case.manage.view.html',
                controller:'caseManageCtrl'
            })
            .state('caseManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/case/views/case.list.view.html',
                controller:'caseListCtrl'
            })
            .state('caseManage.publish', {
                url: '/publish?:caseId',
                templateUrl: 'modules/case/views/case.publish.view.html',
                controller:'casePublishCtrl'
            })
            .state('caseManage.tagList', {
                url: '/tag/list?:status',
                templateUrl: 'modules/case/views/case.tag.list.view.html',
                controller:'tagListCtrl'
            })
            .state('caseManage.tagEdit', {
                url: '/tag/edit?:tagId',
                templateUrl: 'modules/case/views/case.tag.edit.view.html',
                controller:'tagEditCtrl'
            });

    }
]);