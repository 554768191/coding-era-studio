'use strict';

angular.module('case').controller('tagListCtrl', [
    '$scope', '$log', '$state', '$stateParams', '$translate', '$uibModal', 'path', 'TagService', 'ceUtil',
    function ($scope, $log, $state, $stateParams, $translate, $uibModal, path, TagService, ceUtil) {

        $scope.jsonData = {};
        $scope.key = 'title';

        //分页参数
        var searchOptions = {
            page: 0,//当前页
            size: 10,//每页大小
            sort: null, //排序(没做!!!!)
            status: $stateParams.status,
            keyWord: null
        };

        //搜索
        $scope.onSearch = function () {
            TagService.getTags(searchOptions).success(function (res) {
                $scope.jsonData = res.data;
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
                    $scope.onSearch();
                });
            });
        };

        //上一页
        $scope.previousPage = function () {
            searchOptions.page -= 1;
            $scope.onSearch();
        };

        //下一页
        $scope.nextPage = function () {
            searchOptions.page += 1;
            $scope.onSearch();

        };

    }]);

