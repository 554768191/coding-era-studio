/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .run(['Menus',
    function(Menus) {
        var articleMenu = Menus.genMenu({
            name: '文章',
            subTitle:'网站的所有文案管理',
            icon: 'file',
            route:'articleManage',
            secured:'hasPermission("article","read")'
        });
        articleMenu.setOrder(1);
        Menus.addMenus(articleMenu.getMenus());
    }
]).config([
    '$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('articleManage', {
                url: '/article',
                templateUrl: 'modules/article/views/article-manage.client.view.html',
                controller:'articleManageCtrl',
                secured:'hasPermission("article","read")'
            })
            .state('articleManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/article/views/article-list.client.view.html',
                controller:'articleListCtrl',
                secured:'hasPermission("article","read")'
            })
            .state('articleManage.publish', {
                url: '/publish?:articleId',
                templateUrl: 'modules/article/views/article-publish.client.view.html',
                controller:'articlePublishCtrl',
                secured:'hasPermission("article","read")'
            });

    }
]);