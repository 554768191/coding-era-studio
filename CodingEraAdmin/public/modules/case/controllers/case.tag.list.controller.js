'use strict';

angular.module('case').controller('tagListCtrl', [
    '$scope', '$log', '$state', '$stateParams', '$translate', '$uibModal', 'path', 'TagService', 'ceUtil',
    function ($scope, $log, $state, $stateParams, $translate, $uibModal, path, TagService, ceUtil) {

        $scope.jsonData = {};
        $scope.key = 'title';

        //分页参数
        var searchOptions = {
            page: 0,//当前页
            size: 50,//每页大小
            sort: null, //排序(没做!!!!)
            status: $stateParams.status,
            keyWord: null
        };

        //搜索
        $scope.onSearch = function (isLoadMore) {
            TagService.getTags(searchOptions).success(function (res) {
                if(angular.isUndefined(isLoadMore)){
                    $scope.jsonData = res.data;
                }else{
                    //引用工具loadMoreData方法
                    ceUtil.loadMoreData($scope.jsonData,res);
                }

            });

        };

        //默认搜索
        $scope.onSearch();

        $scope.onSearchClick = function(keyWord){
            searchOptions.keyWord = keyWord;
            $scope.onSearch();
        };

        //编辑记录
        $scope.onEditClick = function (obj) {
            $state.go('tagManage.edit', {tagId: obj.id});
        };

        //删除记录
        $scope.onDeleteClick = function (obj) {
            ceUtil.confirmMessage('确认删除?').success(function () {
                TagService.deleteTag({id: obj.id}).success(function () {
                    ceUtil.toast('删除成功');
                    angular.forEach($scope.jsonData.content,function(data,index){
                        if(data.id === obj.id){
                            $scope.jsonData.content.splice(index,1);
                        }
                    });
                    //fix 删除分页的bug,删一个 load 一个出来 (其实是load之前所加载所有数据)
                    var size = ((searchOptions.page +1) * searchOptions.size);
                    TagService.getTags({page:0,size:size ,status:$stateParams.status}).success(function (res) {
                        angular.extend($scope.jsonData.content,res.data.content);
                        $scope.jsonData.last = res.data.last;
                    });

                });
            });
        };

        //上一页 (改成加载更多,目前没有使用此方法)
        $scope.previousPage = function () {
            searchOptions.page -= 1;
            $scope.onSearch();
        };

        //下一页(加载更多)
        $scope.nextPage = function () {
            searchOptions.page += 1;
            $scope.onSearch(true);

        };

    }]);

