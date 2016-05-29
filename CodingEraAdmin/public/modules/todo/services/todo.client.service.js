/**
 * Created by Jason.
 */
'use strict';
angular.module('todo').factory('TodoService', ['$resource', '$log', 'Authentication',
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

