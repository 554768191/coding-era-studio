/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('comment')
    .run(['Menus',
    function(Menus) {

        var commentMenu = Menus.genMenu({name: '评论',subTitle: '管理评论列表', icon: 'comment', route: 'commentManage'});
        commentMenu.setOrder(3);



        Menus.addMenus(commentMenu.getMenus());
    }
]).config(['$stateProvider','$translatePartialLoaderProvider',
    function($stateProvider,$translatePartialLoaderProvider) {

        //国际化
        $translatePartialLoaderProvider.addPart('comment');
        $stateProvider
            .state('commentManage', {
                url: '/comment',
                templateUrl: 'modules/comment/views/comment.manage.view.html',
                controller:'commentManageCtrl'
            })
            .state('commentManage.edit', {
                url: '/edit?:commentId',
                templateUrl: 'modules/comment/views/comment.edit.view.html',
                controller:'commentEditCtrl'
            })
            .state('commentManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/comment/views/comment.list.view.html',
                controller:'commentListCtrl'
            });

    }
]);