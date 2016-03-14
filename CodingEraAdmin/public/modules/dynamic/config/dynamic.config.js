/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('dynamic').run(['Menus',
    function (Menus) {
        var parentMenus = Menus.genParentMenus({name:'网站管理', icon:'tasks'});
        var manage = Menus.genNodeMenus({name:'发布动态', icon:'tasks', route:'todo'});

        parentMenus.setOrder(999);
        parentMenus.addNodeMenus(manage);
        Menus.addMenus(parentMenus.getMenus());
    }
]).config(['$stateProvider','$translatePartialLoaderProvider',
    function ($stateProvider,$translatePartialLoaderProvider) {
        //国际化
        $translatePartialLoaderProvider.addPart('dynamic');
        //
        $stateProvider
            .state('dynamic', {
                url: '/dynamic',
                templateUrl: 'modules/dynamic/views/dynamic.view.html',
                controller: 'dynamicCtrl'
            });
    }
]);