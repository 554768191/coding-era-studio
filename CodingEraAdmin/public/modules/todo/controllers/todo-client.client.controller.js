'use strict';

angular.module('todo').controller('todoCtrl', [
    '$scope', '$sce', '$uibModal', '$log', 'uibDatepickerPopupConfig', 'TodoService', 'TodoCustomService', 'FileUploadService', 'marked',
    function ($scope, $sce, $uibModal, $log, uibDatepickerPopupConfig, TodoService, TodoCustomService, FileUploadService, marked) {

        //$scope.$watch("file", function (val) {
        //    $log.debug('Jason file watch', val);
        //});

        //预览
        $scope.previewed = false;
        $scope.previewedContent = "";
        $scope.togglePreview = function (text) {
            $scope.previewed = !$scope.previewed;

            if (angular.isUndefined(text)) {
                $scope.previewedContent = "";
                return;
            }
            if ($scope.previewed === true) {
                //$scope.previewedContent = $sce.trustAsHtml(window.marked(text));
                $scope.previewedContent = $sce.trustAsHtml(marked(text));
            } else {
                //这里不能马上清空元素,因为关闭下拉的判断会失效(element.contains(event.target))
                //$scope.previewedContent = "";
            }
        };

        $scope.upload = function (files, task) {
            for (var index in files) {
                var file = files[index];
                $log.debug('Jason file', file);
                FileUploadService.upload(file, task);
            }
        };

        //Date
        //定义数组,控制多个日期控件显示状态
        $scope.opened = [];
        //TRANSLATION 日期空间国际化临时解决方案
        uibDatepickerPopupConfig.currentText = '今天';
        uibDatepickerPopupConfig.clearText = '清空';
        uibDatepickerPopupConfig.closeText = '确定';

        //Popover
        $scope.dynamicPopover = {
            templateUrl: 'myPopoverTemplate.html',
            memberTemplateUrl: 'memberTemplate.html'
        };

        //Task
        $scope.task = TodoCustomService.createTask();

        $scope.addTask = function (task, event) {
            if (event) {
                event.preventDefault();
            }
            if (!$scope.form.$valid) {
                return;
            }
            var result = TodoCustomService.addTask($scope.task);
            if (result) {
                $scope.task = TodoCustomService.createTask();
            }
        };
        $scope.cleanTask = function () {
            //$scope.tasks = [];
            //TodoCustomService.tasks.length = 0;
            $scope.tasks.length = 0;
        };
        $scope.taskClass = function (task) {
            return {
                "task-done": !!task.status
            };
        };
        $scope.toggleTaskStatus = function (task) {
            TodoCustomService.toggleTaskStatus(task);
        };
        $scope.onEditTask = function (task) {
            $log.debug('Jason test', task);
            alert("别紧张,测试而已");
        };

        /**
         * 用于接收$rootScope.$broadcast('tasks.update')传播的数据:
         * see: http://blog.csdn.net/dm_vincent/article/details/38705099
         *
         * 循环最少也会运行两次，即使在listener函数中并没有改变任何model.它会多运行一次来确保models没有变化.
         * 在当前的一次循环结束后，它会再执行一次循环用来检查是否有models发生了变化。
         * 这就是脏检查(Dirty Checking)，它用来处理在listener函数被执行时可能引起的model变化。
         * 因此，$digest循环会持续运行直到model不再发生变化，或者$digest循环的次数达到了10次。
         * 因此，尽可能地不要在listener函数中修改model。
         */
        $scope.$on('tasks.update', function (event) {
            //$scope.tasks = TodoCustomService.tasks;
            //$scope.$apply();
            $scope.$apply(function () {
                $scope.tasks = TodoCustomService.tasks;
            });
        });

        $scope.tasks = TodoCustomService.tasks;

        //任务详情下拉标识
        $scope.isCollapsed = true;
        $scope.toggleDetail = function (isCollapsed, task) {
            $log.debug('Jason test', isCollapsed);
            if (angular.isUndefined(task.content)) {
                return;
            }
            //isCollapsed = !isCollapsed;
            if (isCollapsed === false) {
                task.previewedContent = $sce.trustAsHtml(window.marked(task.content));
            }
        };

    }]);

