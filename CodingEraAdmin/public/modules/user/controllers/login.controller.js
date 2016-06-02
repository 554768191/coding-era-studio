'use strict';

angular.module('login', [])
    .controller('navigation',[
        '$rootScope', '$http', '$location',
        function ($rootScope, $http, $location) {

            var self = this;

            var authenticate = function (credentials, callback) {
                var headers = credentials ? {
                    authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
                } : {};

                $http.get('http://localhost:8080/user', {headers : headers}).then(function(response){
                    console.log('Jason ', response);
                    if (response.data.name) {
                        $rootScope.authenticated = true;
                    } else {
                        $rootScope.authenticated = false;
                    }
                    if(callback) callback();
                }, function() {
                    $rootScope.authenticated = false;
                    if(callback) callback();
                });

            };

            //authenticate();

            self.credentials = {};
            self.login = function () {

                console.log('jason ');
                authenticate(self.credentials, function () {
                    if ($rootScope.authenticated) {
                        //$location.path("/");
                        self.error = false;
                    } else {
                        //$location.path("/login");
                        self.error = true;
                    }
                });
            };
        }]);

