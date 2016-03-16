/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('case').factory('CasePublishService', ['$resource', '$log', 'ceConfig', 'TokenHandler',
    function($resource,$log,ceConfig,TokenHandler) {

        var service = $resource(ceConfig.apiUrl+'/case', {
            demoId: '@_id'
        }, {
            query: {
                method: "GET",
                isArray: false
            }
        });

        //加上参数access_token
        service = TokenHandler.wrapActions( service, ["query", "update", "save"] );

        return service;
    }
]);