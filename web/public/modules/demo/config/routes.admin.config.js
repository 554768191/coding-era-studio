/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo').config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('demo', {
                    url: '/demo',
                    templateUrl: 'modules/demo/views/demo.admin.view.html',
                    controller:'demoCtrl'
                });


        }
    ]);