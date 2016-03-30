'use strict';

angular.module('case').controller('commentManageCtrl', [
    '$scope', '$log', '$state',
    function ($scope, $log, $state) {
        if ($state.is('commentManage')) {
            $state.go('commentManage.list', {status: 'WAITING'});
        }
    }]);

