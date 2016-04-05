/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo')
    .value('path','modules/demo')
    .run(['Menus',
    function(Menus) {
        //DEMO
        //var demoMenu=Menus.genMenu({name:'Super Example',icon:'comment', isPublic:false, roles:'JASON'});
        //var node_demo=Menus.genNodeMenus({name:'Base Example',subTitle:'这是一个副标题(不配置就不出现)',icon:'ice-lolly-tasted',route:'demo'});
        //demoMenu.setOrder(98);
        //demoMenu.addNodeMenus(node_demo);
        //Menus.addMenus(demoMenu.getMenus());
        //
        ////控件库
        //var widgetMenu= Menus.genParentMenus({name:'控件库',icon:'wrench', isPublic:false, roles:'JASON'});
        //var node_widget_panel=Menus.genNodeMenus({name:'面板',subTitle:'面板的简易封装',route:'widget/panel'});
        //var node_widget_button=Menus.genNodeMenus({name:'按钮',subTitle:'基本跟官方一样',route:'widget/button'});
        //widgetMenu.addNodeMenus(node_widget_panel);
        //widgetMenu.addNodeMenus(node_widget_button);
        //Menus.addMenus(demoMenu.getMenus());
    }
]).config(['$stateProvider','$translatePartialLoaderProvider',
    function($stateProvider,$translatePartialLoaderProvider) {

        //国际化
        $translatePartialLoaderProvider.addPart('demo');
        $stateProvider
            .state('demo', {
                url: '/demo',
                templateUrl: 'modules/demo/views/demo.view.html',
                controller:'demoCtrl'
            })
            .state('widget/panel', {
                url: '/widget/panel',
                templateUrl: 'modules/demo/views/demo.widget.panel.view.html'
            })
            .state('widget/button', {
                url: '/widget/button',
                templateUrl: 'modules/demo/views/demo.widget.button.view.html'
            });


    }
]);