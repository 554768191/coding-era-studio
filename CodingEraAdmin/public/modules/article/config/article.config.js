/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('case')
    .run(['Menus',
    function(Menus) {
        var articleMenu = Menus.genMenu({name: '文章',subTitle:'网站的所有文案管理', icon: 'file',route:'articleManage'});
        articleMenu.setOrder(1);
        Menus.addMenus(articleMenu.getMenus());
    }
]).config([
    '$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('articleManage', {
                url: '/article',
                templateUrl: 'modules/article/views/article.manage.view.html',
                controller:'articleManageCtrl'
            })
            .state('articleManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/article/views/article.list.view.html',
                controller:'articleListCtrl'
            })
            .state('articleManage.publish', {
                url: '/publish?:articleId',
                templateUrl: 'modules/article/views/article.publish.view.html',
                controller:'articlePublishCtrl'
            });

    }
]);