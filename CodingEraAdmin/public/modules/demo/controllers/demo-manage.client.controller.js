'use strict';

angular.module('demo').controller('demoManageCtrl', [
    '$scope', '$log', '$state', 'ceUtil',
    function ($scope, $log, $state, ceUtil) {
        if ($state.is('demoManage')) {
            $state.go('demoManage.demo');
        }

        $scope.onAddTagClick = function(){
            ceUtil.openModal({route:'demoManage.edit',size:'sm'}).success(function(res){
                $state.go('demoManage.demo',{status:'INIT'},{reload:true});
            });
        };
    }]);

