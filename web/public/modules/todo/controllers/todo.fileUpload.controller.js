'use strict';

angular.module('todo').controller('fileUploadCtrl', ['$scope', 'Upload', 'uiGridConstants',
    function ($scope, Upload, uiGridConstants) {

        $scope.file = null;
        $scope.files = null;

        //文件队列
        $scope.demoData = [
        ];
        $scope.$watch("file", function (val) {
            console.log('Jason file watch', val);
            $scope.progressPercentage = 0;
            if(val){
                //单文件上传
                $scope.demoData.push(val);
            }
        });
        $scope.$watch("files", function (val) {
            console.log('Jason files watch', val);
            $scope.progressPercentage = 0;
            if(val){
                if(angular.isArray(val)){
                    //多文件上传,这里只能循环push,直接push数组guid无法识别,不知什么原因
                    for(var index in val){
                        $scope.demoData.push(val[index]);
                    }
                }else{
                    //拖拽上传
                    $scope.demoData.push(val);
                }
            }
        });

        //表格 todo Jason GRID尚存问题未解决:1.列头宽度拖拽 2.行高自适应 3.单元格内容怎么显示完整
        $scope.gridOptions = {
            data:"demoData",
            animate:false,
            enableColumnMenus:false,
            enableSorting:false,
            //enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar:uiGridConstants.scrollbars.NEVER,
            rowHeight:40,
            columnDefs: [
                { name: '$$hashKey',displayName:'ID' },
                { name: 'name',displayName:'名称' },
                { name: 'size',displayName:'size' },
                { name: 'type',displayName:'type' },
                { name: 'remark',displayName:'备注' },
                { name: '1',displayName:'Status', cellTemplate: '<span>success</span>'},
                { name: '2', displayName:'Progress', cellTemplate: ' <uib-progressbar animate="true" value="row.entity.progressPercentage || 0" type="success"><b>{{row.entity.progressPercentage || 0}}%</b></uib-progressbar>'},
                { name: '3', displayName:'preview', cellTemplate: '<div class="text-center"><img src="" ngf-thumbnail="row.entity || \'modules/todo/images/yan.jpg\'" style="width: 40px;height: 40px;"></div>'},
                { name: 'ShowScope', displayName:'Actions', cellTemplate:'<button class="btn btn-sm primary" ng-click="grid.appScope.upload(row.entity)">提交</button>' }
            ]
        };

        // upload later on form submit or something similar
        $scope.submit = function () {
            $scope.progressPercentage = 0;
            console.log('Jason test', $scope.file);
            //if (form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
            //}
        };
        $scope.submits = function () {
            console.log('Jason $scope.files',$scope.files);
            //if (form.file.$valid && $scope.files) {
            $scope.uploadFiles($scope.files);
            //}
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            console.log('Jason test file ehhehehhe', file);
            if (file) {
                Upload.upload({
                    url: 'http://localhost:8999/api/fileUpload/uploadImage',
                    data: {'file': file, 'username': $scope.username}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    file.status = "Success";
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    file.status = resp.status;
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    file.progressPercentage = progressPercentage;
                    $scope.progressPercentage = progressPercentage;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        };
        // for multiple files:
        $scope.uploadFiles = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    $scope.upload({data: {file: files[i]}});
                }

                // or send them all together for HTML5 browsers:
                //Upload.upload({
                //    url: 'http://localhost:8999/api/fileUpload/uploadImages',
                //    data: {file:files}
                //}).then(function (resp) {
                //    //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                //    console.log('Jason multi test', resp);
                //}, function (resp) {
                //    console.log('Error status: ' + resp.status);
                //}, function (evt) {
                //    console.log('progress', evt);
                //    //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //    //console.log('progress: ' + progressPercentage + '% ');
                //});
            }
        };

    }]);

