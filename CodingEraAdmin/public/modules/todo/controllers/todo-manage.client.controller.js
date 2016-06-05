'use strict';

angular.module('todo').controller('todoManageCtrl', [
    '$scope', '$log', '$state',
    function ($scope, $log, $state) {
        if ($state.is('jason')) {
            $state.go('jason.todo');
        }
    }]);

