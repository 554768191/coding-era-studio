/**
 * 用户指引
 *
 * 暂时还是一个粗略的demo,里面涉及到了很多精要的思想,
 * 要在生产上使用的话应该更进一步优化!!!
 *
 */

'use strict';

angular.module('todo')
    .filter('range', [function () {
        return function (len) {
            var a = window._.range(1, len + 1);
            //console.log('Jason test range', a);
            return a;
        };
    }])
    .controller('StepPanelController', ['currentStep', 'trainnings', 'trainningInstance',
        function(currentStep, trainnings, trainningInstance) {
            console.log('Jason test trainnings', trainnings);
            console.log('Jason test trainningInstance', trainningInstance);
        var vm = this;
        vm.currentStep = currentStep;
        vm.trainnings = trainnings;
        vm.trainningInstance = trainningInstance;
        vm.texts = ['Write your own sort blog.', 'Click button to public your blog.', 'View your blog info on there.', 'Click this button, you can restart this trainning when .', 'All trainnings done!'];
        return vm;
    }])
    .constant('trainningCourses', {
        courses: [{
            title: 'Step 1:',
            templateUrl: 'trainning-content.html',
            controller: 'StepPanelController',
            controllerAs: 'stepPanel',
            placement: 'left',
            backdrop: true,
            position: '#blogControl'
        }, {
            title: 'Step 2:',
            templateUrl: 'trainning-content.html',
            controller: 'StepPanelController',
            controllerAs: 'stepPanel',
            placement: 'right',
            backdrop: false,
            position: '#submitBlog'
        }, {
            title: 'Step 3:',
            templateUrl: 'trainning-content.html',
            controller: 'StepPanelController',
            controllerAs: 'stepPanel',
            placement: 'top',
            position: {
                top: 200,
                left: 100
            }
        }, {
            title: 'Step 4:',
            templateUrl: 'trainning-content.html',
            controller: 'StepPanelController',
            controllerAs: 'stepPanel',
            placement: 'bottom',
            position: '#startAgain'
        }, {
            stepClass: 'last-step',
            backdropClass: 'last-backdrop',
            templateUrl: 'trainning-content-done.html',
            controller: 'StepPanelController',
            controllerAs: 'stepPanel',
            position: ['$window', 'stepPanel','$uibPosition', function($window, stepPanel, $uibPosition) {
                //var win = angular.element($window);
                var spPosition = $uibPosition.position(stepPanel);
                return {
                    //如果不用jquery,如下方法都失效
                    //top: (win.height() - stepPanel.height()) / 2,
                    //left: (win.width() - stepPanel.width()) / 2
                    top: ($window.innerHeight - spPosition.height) / 2,
                    left: ($window.innerWidth - spPosition.width) / 2
                };
            }]
        }]
    })
    .controller('trainingCtrl', ['trainningService', 'trainningCourses', 'modalBackdropService',
        function (trainningService, trainningCourses, modalBackdropService) {
            var vm = this;

            //用户指引
            vm.trainning = function () {
                //call this service should wait your really document ready event.
                trainningService.trainning(trainningCourses.courses)
                    .done(function () {
                        vm.isDone = true;
                    });
            };

            //?
            var backdropInstance = angular.noop;

            //模态化
            vm.backdrop = function () {
                modalBackdropService.backdrop();
            };

            //关闭完成提示
            vm.closeAlert = function () {
                vm.isDone = false;
            };

            //vm.trainning();

            return vm;
        }]);

