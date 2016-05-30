'use strict';

angular.module('user').controller('usersManageCtrl', [
    '$scope', '$log', '$state',
    function ($scope, $log, $state) {
        if ($state.is('usersManage')) {
            $state.go('usersManage.edit');
        }
    }]);

