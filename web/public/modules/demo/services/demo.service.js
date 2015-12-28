/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('demo').factory('DemoService', ['$resource','$log','ceConfig',
    function($resource,$log,ceConfig) {
        var service=$resource(ceConfig.apiUrl+'/demo/:demoId', {
            demoId: '@_id'
        }, {
            query: {
                method: "GET",
                isArray: false
            }
        });
        return service;
    }
]);