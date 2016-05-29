/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo')
    .run(['Menus',
    function(Menus) {
        //DEMO
        //var demoMenu=Menus.genMenu({name:'DEMO',subTitle:'Coding Era Studio 各种指令展示',icon:'sunglasses',roules:'demo',route:'demo'});
        //demoMenu.setOrder(999);
        //Menus.addMenus(demoMenu.getMenus());
    }
]).config([
    '$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('demo', {
                url: '/demo',
                templateUrl: 'modules/demo/views/demo.client.view.html',
                controller:'demoCtrl'
            })
            .state('widget/panel', {
                url: '/widget/panel',
                templateUrl: 'modules/demo/views/demo-widget-panel.client.view.html'
            })
            .state('widget/button', {
                url: '/widget/button',
                templateUrl: 'modules/demo/views/demo-widget-button.client.view.html'
            });


    }
]);