/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo').config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('demo', {
                    url: '/demo',
                    templateUrl: 'modules/demo/views/demo.view.html',
                    controller:'demoCtrl'
                })
                .state('widget', {
                    url: '/widget',
                    templateUrl: 'modules/demo/views/demo.widget.panel.view.html',
                    controller:'widgetCtrl'
                });


        }
    ]);