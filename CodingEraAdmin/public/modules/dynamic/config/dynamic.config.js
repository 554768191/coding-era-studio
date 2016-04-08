/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('dynamic')
    .run(['Menus',
    function(Menus) {

        var dynamicMenu = Menus.genMenu({name: '动态',subTitle: '发布 Coding Era 团队动态', icon: 'globe', route: 'dynamicManage'});
        dynamicMenu.setOrder(4);
        Menus.addMenus(dynamicMenu.getMenus());
    }
]).config([
    '$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('dynamicManage', {
                url: '/dynamic',
                templateUrl: 'modules/dynamic/views/dynamic.manage.view.html',
                controller:'dynamicManageCtrl'
            })
            .state('dynamicManage.edit', {
                url: '/edit?:dynamicId',
                templateUrl: 'modules/dynamic/views/dynamic.edit.view.html',
                controller:'dynamicEditCtrl'
            })
            .state('dynamicManage.list', {
                url: '/list?:status',
                templateUrl: 'modules/dynamic/views/dynamic.list.view.html',
                controller:'dynamicListCtrl'
            });

    }
]);