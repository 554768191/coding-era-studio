/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .value('path','modules/case')
    .run(['Menus',
    function(Menus) {

        var caseMenu = Menus.genParentMenus({name: '作品管理', icon: 'th-large'});
        caseMenu.setOrder(-1);

        //CASE
        var node_case = Menus.genNodeMenus({name: '发布作品', subTitle: '发布门户网站的作品', icon: 'plus', route: 'case/publish'});
        var node_case_list = Menus.genNodeMenus({name: '作品列表', subTitle: '管理作品列表', icon: 'search', route: 'case/list'});
        caseMenu.addNodeMenus(node_case);
        caseMenu.addNodeMenus(node_case_list);

        //TAG
        var node_tag_list = Menus.genNodeMenus({name: '标签管理', subTitle: '管理标签列表', icon: 'tag', route: 'tag/list'});
        caseMenu.addNodeMenus(node_tag_list);

        Menus.addMenus(caseMenu.getMenus());
    }
]).config(['$stateProvider','$translatePartialLoaderProvider',
    function($stateProvider,$translatePartialLoaderProvider) {

        //国际化
        $translatePartialLoaderProvider.addPart('case');
        $stateProvider
            .state('case/publish', {
                url: '/case/publish',
                templateUrl: 'modules/case/views/case.publish.view.html',
                controller:'casePublishCtrl'
            })
            .state('case/list', {
                url: '/case/list',
                templateUrl: 'modules/case/views/case.list.view.html',
                controller:'caseListCtrl'
            })
            .state('case/edit', {
                url: '/case/publish',
                templateUrl: 'modules/case/views/case.tag.edit.view.html',
                controller:'tagEditCtrl'
            })
            .state('tag/list', {
                url: '/tag/list',
                templateUrl: 'modules/case/views/case.tag.list.view.html',
                controller:'tagListCtrl'
            });

    }
]);