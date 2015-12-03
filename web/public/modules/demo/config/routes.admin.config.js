/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo').config(['$stateProvider',
        function($stateProvider) {

           // $translatePartialLoaderProvider.addPart('demo');
            $stateProvider
                .state('demo', {
                    url: '/demo',
                    templateUrl: 'modules/demo/views/demo.admin.view.html',
                    controller:'demoCtrl'
                });


        }
    ])