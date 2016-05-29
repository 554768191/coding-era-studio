'use strict';

angular.module('dynamic').controller('dynamicManageCtrl', [
    '$scope', '$log', '$state',
    function ($scope, $log, $state) {
        if ($state.is('dynamicManage')) {
            $state.go('dynamicManage.list', {status: 'PUBLISHED'});
        }
    }]);

