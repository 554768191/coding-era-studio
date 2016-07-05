/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .value('path','modules/case')
    .run(['Menus',
    function(Menus) {

        var caseMenu = Menus.genMenu({
            name: '案例',
            subTitle: '管理门户展示的作品',
            icon: 'th-large',
            route: 'caseManage',
            secured:'hasPermission("case","read")'
        });
        caseMenu.setOrder(2);

        Menus.addMenus(caseMenu.getMenus());
    }
]).config([
    '$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('caseManage', {
                url: '/case',
                templateUrl: 'modules/case/views/case-manage.client.view.html',
                controller:'caseManageCtrl',
                secured:'hasPermission("case","read")'
            })
            .state('caseManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/case/views/case-list.client.view.html',
                controller:'caseListCtrl',
                secured:'hasPermission("case","read")'
            })
            .state('caseManage.publish', {
                url: '/publish?:caseId',
                templateUrl: 'modules/case/views/case-publish.client.view.html',
                controller:'casePublishCtrl',
                secured:'hasPermission("case","read")'
            })
            .state('caseManage.tagList', {
                url: '/tag/list?:status',
                templateUrl: 'modules/case/views/case-tag-list.client.view.html',
                controller:'tagListCtrl',
                secured:'hasPermission("case","read")'
            })
            .state('caseManage.tagEdit', {
                url: '/tag/edit?:tagId',
                templateUrl: 'modules/case/views/case-tag-edit.client.view.html',
                controller:'tagEditCtrl',
                secured:'hasPermission("case","read")'
            });

    }
]);