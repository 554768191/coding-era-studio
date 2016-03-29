'use strict';

angular.module('case').controller('tagManageCtrl', [
    '$scope', '$log', '$state',
    function ($scope, $log, $state) {
        if ($state.is('tagManage')) {
            $state.go('tagManage.list', {status: 'INIT'});
        }
        $scope.onSearchClick = function (keyWord) {

        };
    }]);

