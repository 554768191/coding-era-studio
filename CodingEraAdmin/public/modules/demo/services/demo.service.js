/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('demo').factory('DemoService', ['$resource', '$log', '$window', 'TokenHandler',
    function($resource,$log,$window,TokenHandler) {

        var service = $resource($window.apiURL+'/demo/:demoId', {
            demoId: '@_id'
        }, {
            query: {
                method: "GET",
                isArray: false
            },
            save: {
                method: "POST"
            }
        });

        //加上参数access_token
        service = TokenHandler.wrapActions( service, ["query", "update", "save"] );

        return service;
    }
]);