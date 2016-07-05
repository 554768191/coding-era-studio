'use strict';

angular.module('dynamic').controller('dynamicListCtrl', [
    '$scope', '$log','$state','$stateParams', 'DynamicService', 'ceUtil','Authentication',
    function ($scope, $log,$state,$stateParams, DynamicService, ceUtil,Authentication) {

        $scope.dynamicData = {};
        $scope.status = $stateParams.status;

        var searchOptions = ceUtil.initPageParameter({status:$stateParams.status,keyWord:null});

        //搜索
        $scope.onSearch = function(isLoadMore){
            DynamicService.getDynamics(searchOptions).success(function(res){
                if(angular.isUndefined(isLoadMore)){
                    $scope.dynamicData = res.data;
                }else{
                    //引用工具loadMoreData方法
                    ceUtil.loadMoreData($scope.dynamicData,res);
                }
            });
        };
        $scope.onSearch();

        //编辑记录
        $scope.onEditClick = function(obj){
            ceUtil.openModal({route:'dynamicManage.edit',data:{id:obj.id}}).success(function(res){
                //console.log(res)
                //重新加载数据
                $scope.onSearch();
            });
        };

        //删除记录
        $scope.onDeleteClick = function(obj){
            ceUtil.confirmMessage('确认删除?').success(function(){
                Authentication.isNotGuest(function(){
                    DynamicService.deleteDynamic({id:obj.id}).success(function(){
                        ceUtil.toast('删除成功');
                        $scope.onSearch();
                    });
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



        //下一页
        $scope.onLoadMoreClick = function(){
            searchOptions.page += 1;
            $scope.onSearch(true);

        };

        $scope.onSearchClick = function(keyWord){
            searchOptions.keyWord = keyWord;
            $scope.onSearch();
        };

    }]);

