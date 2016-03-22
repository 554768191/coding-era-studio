/**
 * Created by Jason.
 */
'use strict';
angular.module('dynamic').factory('dynamicService', ['$resource', '$log', 'Authentication',
    function ($resource, $log, Authentication) {
        var service = $resource(Authentication.apiURL + '/demo/:demoId', {
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

