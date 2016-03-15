/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('demo').factory('DemoService', ['$resource', '$log', 'ceConfig', 'TokenHandler',
    function($resource,$log,ceConfig,TokenHandler) {

        var service = $resource(ceConfig.apiUrl+'/demo/:demoId', {
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