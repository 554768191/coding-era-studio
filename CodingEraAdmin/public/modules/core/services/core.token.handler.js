/**
 * Created by JasonWoo on 16/3/7.
 *
 * AngularJS: Send auth token with every request
 * see: http://nils-blum-oeste.net/angularjs-send-auth-token-with-every-request/
 *
 */
"use strict";

angular.module('core').factory('TokenHandler', ["Authentication",
    function (Authentication) {
        var tokenHandler = {};
        var token = Authentication.user.accessToken || "none";

        tokenHandler.set = function (newToken) {
            token = newToken;
        };

        tokenHandler.get = function () {
            return token;
        };

        // wraps resource action to send request with auth token
        var tokenWrapper = function( resource, action ) {
            // copy original action
            resource['_' + action]  = resource[action];
            // create new action wrapping the original
            // and sending token
            resource[action] = function( data, success, error){
                return resource['_' + action](
                    // call action with provided data and
                    // appended access_token
                    angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
                    success,
                    error
                );
            };
        };

        // wraps given actions of a resource to send auth token
        // with every request
        tokenHandler.wrapActions = function( resource, actions ) {
            // copy original resource
            var wrappedResource = resource;
            // loop through actions and actually wrap them
            for (var i=0; i < actions.length; i++) {
                tokenWrapper( wrappedResource, actions[i] );
            }
            // return modified copy of resource
            return wrappedResource;
        };

        return tokenHandler;
    }
]);