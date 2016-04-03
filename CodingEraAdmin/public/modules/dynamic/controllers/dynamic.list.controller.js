'use strict';

angular.module('dynamic').controller('dynamicListCtrl', [
    '$scope', '$log','$state','$stateParams', 'DynamicService', 'ceUtil',
    function ($scope, $log,$state,$stateParams, DynamicService, ceUtil) {

        $scope.dynamicData = {};


        var searchOptions = ceUtil.initPageParameter({status:$stateParams.status,keyWord:null});

        //搜索
        $scope.onSearch = function(){
            DynamicService.getDynamics(searchOptions).success(function(res){
                $scope.dynamicData = res.data;
            });
        };
        $scope.onSearch();

        //编辑记录
        $scope.onEditClick = function(obj){
            $state.go('dynamicManage.edit',{dynamicId:obj.id});
        };

        //删除记录
        $scope.onDeleteClick = function(obj){
            ceUtil.confirmMessage('确认删除?').success(function(){
                DynamicService.deleteDynamic({id:obj.id}).success(function(){
                    ceUtil.toast('删除成功');
                    $scope.onSearch();
                });
            });
        };

        //发布动态
        $scope.onPublishClick = function (){
            //使用 openModal 打开发布界面
            ceUtil.openModal({route:'dynamicManage.edit'}).success(function(res){
                //console.log(res)
                //重新加载数据
                $scope.onSearch();
            });
        };

        //上一页
        $scope.previousPage = function(){
            searchOptions.page -= 1;
            $scope.onSearch();
        };

        //下一页
        $scope.nextPage = function(){
            searchOptions.page += 1;
            $scope.onSearch();

        };

        $scope.onSearchClick = function(keyWord){
            searchOptions.keyWord = keyWord;
            $scope.onSearch();
        };

    }]);

