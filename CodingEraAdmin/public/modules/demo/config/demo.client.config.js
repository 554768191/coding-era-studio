/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo')
    .run(['Menus',
    function(Menus) {
        //DEMO
        var demoMenu=Menus.genMenu({name:'DEMO',subTitle:'Coding Era Studio 各种指令展示',icon:'sunglasses',
            roles:'JASON',
            //secured:"hasPermission('article','read')",
            //secured:"hasRole('JASON')",
            route:'demoManage'});
        demoMenu.setOrder(9999);
        Menus.addMenus(demoMenu.getMenus());
    }
]).config([
    '$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('demoManage', {
                url: '/demo',
                templateUrl: 'modules/demo/views/demo-manage.client.view.html',
                controller:'demoManageCtrl'
                //secured:"hasPermission('article','read')",
            })
            .state('demoManage.demo', {
                url: '/list',
                templateUrl: 'modules/demo/views/demo.client.view.html',
                controller:'demoCtrl'
            })
            .state('demoManage.edit', {
                url: '/edit',
                templateUrl: 'modules/demo/views/demo-edit.client.view.html',
                controller:'demoEditCtrl'
            });


    }
]);