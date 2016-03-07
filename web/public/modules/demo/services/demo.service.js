/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('demo').factory('DemoService', ['$resource', '$log', 'ceConfig', 'TokenHandler',
    function($resource,$log,ceConfig,TokenHandler) {

        var service = $resource(ceConfig.apiUrl+'/demo/page', {
            demoId: '@_id'
        }, {
            query: {
                method: "GET",
                isArray: false
            }
        });

        service = TokenHandler.wrapActions( service, ["query", "update", "save"] );

        return service;
    }
]);