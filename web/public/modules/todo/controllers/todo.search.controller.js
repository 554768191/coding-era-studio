'use strict';

angular.module('todo').controller('searchCtrl', ['$scope', 'GitHubService',
    function ($scope, GitHubService) {

        $scope.executeSearch = function executeSearch() {
            GitHubService.searchRepos($scope.query, function (error, data) {
                if (!error) {
                    $scope.repos = data.items;
                }
            });
        };

        $scope.openRepo = function openRepo(name) {
            GitHubService.getRepo(name, function (error, data) {
                if (!error) {
                    $scope.activeRepo = data;

                    GitHubService.getReadme(name, function (error, data) {
                        if (!error) {
                            $scope.activeRepo.readme = data;
                        } else {
                            $scope.activeRepo.readme = 'No README found!别折磨自己了好吗..';
                        }
                    });
                }
            });
        };

    }]);

