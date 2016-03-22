'use strict';

angular.module('users').controller('AuthenticationController',[
    '$scope', '$http', '$location', 'Authentication',
        function ($scope, $http, $location, Authentication) {
            $scope.authentication = Authentication;

            // If user is signed in then redirect back home
            if ($scope.authentication.user) $location.path('/');

            // 注册
            $scope.signup = function () {
                // /auth/signup
                $http.post(Authentication.apiURL + '/open/user/signup', $scope.credentials).success(function (response) {

                    // If successful we assign the response to the global user model
                    $scope.authentication.user = response.data;

                    // And redirect to the index page
                    $location.path('/');
                }).error(function (response) {
                    $scope.error = response.message;
                });
            };

            // 登录
            $scope.signin = function () {

                if ($scope.authentication.user) $location.path('/');
                $location.path('/auth/signin');

                //$http.post('/auth/signin', $scope.credentials).success(function (response) {
                //
                //    console.log('/auth/signin', response);
                //
                //    // If successful we assign the response to the global user model
                //    $scope.authentication.user = response;
                //
                //    // And redirect to the index page
                //    $location.path('/');
                //}).error(function (response) {
                //    $scope.error = response.message;
                //});
            };
        }
    ]);