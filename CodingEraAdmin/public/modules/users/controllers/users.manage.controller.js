'use strict';

angular.module('users').controller('usersManageCtrl', [
    '$scope', '$log', '$state',
    function ($scope, $log, $state) {
        if ($state.is('usersManage')) {
            $state.go('usersManage.list', {status: 'PASSED'});
        }
    }]);

