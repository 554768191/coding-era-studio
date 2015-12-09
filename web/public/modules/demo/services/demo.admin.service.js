/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('demo').factory('DemoService', ['$resource',
    function($resource) {
        var service=$resource(CeConfig.apiUrl+'/demo/:demoId', {
            demoId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: "GET",
                isArray: false
            }
        });
        return service;
    }
]);