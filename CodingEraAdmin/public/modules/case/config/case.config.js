/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .value('path','modules/case')
    .run(['Menus',
    function(Menus) {

        var caseMenu = Menus.genParentMenus({name: '作品', icon: 'th-large'});
        caseMenu.setOrder(-1);

        //CASE
        var node_case_list = Menus.genNodeMenus({name: '作品列表', subTitle: '管理作品列表', icon: 'th-list', route: 'caseManage'});
        caseMenu.addNodeMenus(node_case_list);

        //TAG
        var node_tag_list = Menus.genNodeMenus({name: '标签管理', subTitle: '管理标签列表', icon: 'tag', route: 'tagList'});
        caseMenu.addNodeMenus(node_tag_list);

        Menus.addMenus(caseMenu.getMenus());
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
            .state('caseManage.list', {
                url: '/list',
                templateUrl: 'modules/case/views/case.list.view.html',
                controller:'caseListCtrl'
            })
            .state('caseManage.publish', {
                url: '/publish',
                templateUrl: 'modules/case/views/case.publish.view.html',
                controller:'casePublishCtrl'
            })
            .state('tagEdit', {
                url: '/tag/edit',
                templateUrl: 'modules/case/views/case.tag.edit.view.html',
                controller:'tagEditCtrl'
            })
            .state('tagList', {
                url: '/tag/list',
                templateUrl: 'modules/case/views/case.tag.list.view.html',
                controller:'tagListCtrl'
            });

    }
]);