/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('comment')
    .run(['Menus',
    function(Menus) {

        var commentMenu = Menus.genMenu({
            name: '评论',
            subTitle: '管理评论列表',
            icon: 'comment',
            route: 'commentManage',
            secured:'hasPermission("comment","read")'
        });
        commentMenu.setOrder(3);



        Menus.addMenus(commentMenu.getMenus());
    }
]).config(['$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('commentManage', {
                url: '/comment',
                templateUrl: 'modules/comment/views/comment-manage.client.view.html',
                controller:'commentManageCtrl',
                secured:"hasPermission('comment','read')"
            })
            .state('commentManage.edit', {
                url: '/edit?:commentId',
                templateUrl: 'modules/comment/views/comment-edit.client.view.html',
                controller:'commentEditCtrl',
                secured:"hasPermission('comment','read')"
            })
            .state('commentManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/comment/views/comment-list.client.view.html',
                controller:'commentListCtrl',
                secured:"hasPermission('comment','read')"
            });

    }
]);