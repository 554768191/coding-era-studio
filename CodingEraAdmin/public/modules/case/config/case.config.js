/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .value('path','modules/case')
    .run(['Menus',
    function(Menus) {

        var caseMenu = Menus.genParentMenus({name: '作品', icon: 'th-large'});
        caseMenu.setOrder(1);

        //CASE
        var node_case_list = Menus.genNodeMenus({name: '作品列表', subTitle: '管理作品列表', icon: 'th-list', route: 'caseManage'});
        caseMenu.addNodeMenus(node_case_list);

        //TAG
        var node_tag_list = Menus.genNodeMenus({name: '标签管理', subTitle: '标签列表', icon: 'tag', route: 'tagManage'});
        caseMenu.addNodeMenus(node_tag_list);

        //COMMENT
        var node_comment_list = Menus.genNodeMenus({name: '评论管理', subTitle: '评论列表', icon: 'comment', route: 'commentManage'});
        caseMenu.addNodeMenus(node_comment_list);

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
                url: '/list?:status',
                templateUrl: 'modules/case/views/case.list.view.html',
                controller:'caseListCtrl'
            })
            .state('caseManage.publish', {
                url: '/publish?:caseId',
                templateUrl: 'modules/case/views/case.publish.view.html',
                controller:'casePublishCtrl'
            })
            .state('tagManage', {
                url: '/tag',
                templateUrl: 'modules/case/views/case.tag.manage.view.html',
                controller:'tagManageCtrl'
            })
            .state('tagManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/case/views/case.tag.list.view.html',
                controller:'tagListCtrl'
            })
            .state('tagManage.edit', {
                url: '/edit?:tagId',
                templateUrl: 'modules/case/views/case.tag.edit.view.html',
                controller:'tagEditCtrl'
            })
            .state('commentManage', {
                url: '/comment',
                templateUrl: 'modules/case/views/case.comment.manage.view.html',
                controller:'commentManageCtrl'
            })
            .state('commentManage.edit', {
                url: '/edit?:commentId',
                templateUrl: 'modules/case/views/case.comment.edit.view.html',
                controller:'commentEditCtrl'
            })
            .state('commentManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/case/views/case.comment.list.view.html',
                controller:'commentListCtrl'
            });

    }
]);