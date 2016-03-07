/**
 * Created by Jason.
 */
'use strict';
angular.module('dynamic').factory('dynamicService', ['$resource', '$log', 'ceConfig',
    function ($resource, $log, ceConfig) {
        var service = $resource(ceConfig.apiUrl + '/demo/:demoId', {
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

