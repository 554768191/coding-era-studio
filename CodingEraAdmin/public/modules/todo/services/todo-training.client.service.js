/**
 *
 * 关于trainning这个插件，它是一个全局的插件，正好在Angular中所有的service也是单例的，所以将用户引导逻辑封装到Angular的service中是一个不错的设计。
 * 但对于trainning的每一步展示内容信息则是DOM操作，在Angular的处理中它不该存在于service中，
 * 最佳的方式是应该把他封装到Directive中。
 * 所以这里采用Directive的定义，并在service中compile，然后append到body中。
 *
 * Created by Jason.
 *
 */

'use strict';

angular.module('todo').service('modalBackdropService', ['$rootScope', '$compile', '$document',
    function ($rootScope, $compile, $document) {
        var self = this;

        self.backdrop = function (backdropClass, zIndex) {
            var $backdrop = angular.element('<ui-backdrop></ui-backdrop>')
                .attr({
                    'backdrop-class': 'backdropClass',
                    'z-index': 'zIndex'
                });

            var backdropScope = $rootScope.$new(true);
            backdropScope.backdropClass = backdropClass;
            backdropScope.zIndex = zIndex;

            $document.find('body').append($compile($backdrop)(backdropScope));

            return function () {
                $backdrop.remove();
                backdropScope.$destroy();
            };
        };
    }]).service('trainningService', ['$compile', '$rootScope', '$document', '$q',
    function ($compile, $rootScope, $document, $q) {
        var self = this;

        self.trainning = function (trainnings) {
            //1.对于每一个这类独立的插件应该封装一个独立的scope，这样便于在后续的销毁，以及不会与现有的scope变量的冲突。
            //2.q对延时触发的结果包装。对于像该trainning插件或者modal这类操作结果采用promise的封装，是一个不错的选择。
            // 它取代了回调参数的复杂性，并以流畅API的方式展现，更利于代码的可读性。同时也能与其他Angular service统一返回API。
            var trainningScope = $rootScope.$new(true),
                defer = $q.defer(),
                $stepElm = angular.element('<trainning-step></trainning-step>')
                    .attr({
                        'step': 'step',
                        'trainnings': 'trainnings',
                        'next-step': 'nextStep($event, step);',
                        'cancel': 'cancel($event, step)'
                    }),
                destroyTrainningPanel = function () {
                    if (trainningScope) {
                        $stepElm.remove();
                        trainningScope.$destroy();
                    }
                };

            //取消事件
            trainningScope.cancel = function ($event, step) {
                defer.reject('cancel');
            };
            //下一步事件
            trainningScope.nextStep = function ($event, step) {
                if (trainningScope.step === trainnings.length) {
                    destroyTrainningPanel();
                    return defer.resolve('done');
                }

                trainningScope.step++;
            };
            //constant中定义的配置
            trainningScope.trainnings = trainnings;
            //步骤
            trainningScope.step = 1;

            $document.find('body').append($compile($stepElm)(trainningScope));
            trainningScope.$on('$locationChangeStart', destroyTrainningPanel);

            return {
                done: function (func) {
                    defer.promise.then(func);
                    return this;
                },
                cancel: function (func) {
                    defer.promise.then(null, func);
                    return this;
                }
            };
        };

    }]);

