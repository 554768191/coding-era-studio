'use strict';

angular.module('case').controller('caseManageCtrl',[
    '$scope','$log','$state', 'ceUtil',
    function ($scope, $log,$state,ceUtil){
        //默认加载'所有已发布作品'
        if($state.is('caseManage')){
           $state.go('caseManage.list',{status:'PUBLISHED'});
        }


        $scope.onAddTagClick = function(){
            ceUtil.openModal({route:'caseManage.tagEdit',size:'sm'}).success(function(res){
                $state.go('caseManage.tagList',{status:'INIT'},{reload:true});
            });
        };
}]);

