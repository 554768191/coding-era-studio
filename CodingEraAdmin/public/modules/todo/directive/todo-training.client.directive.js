/**
 * Created by Jason on 2016年01月23日.
 */
"use strict";


angular.module('todo').directive('uiBackdrop', ['$document',
    function ($document) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'modal-backdrop.html',
            scope: {
                backdropClass: '=',
                zIndex: '='
            }
            /* ,link: function(){
             $document.bind('keydown', function(evt){
             evt.preventDefault();
             evt.stopPropagation();
             });

             scope.$on('$destroy', function(){
             $document.unbind('keydown');
             });
             }*/
        };
    }])
    .directive('trainningStep', ['$timeout', '$http', '$templateCache', '$compile', '$uibPosition', '$injector', '$window', '$q', '$controller',
        function ($timeout, $http, $templateCache, $compile, $position, $injector, $window, $q, $controller) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'trainning-step.html',
            scope: {
                step: '=',
                trainnings: '=',
                nextStep: '&',
                cancel: '&'
            },
            link: function (stepPanelScope, elm) {

                //jqLite的find()方法不能找class - Limited to lookups by tag name
                //var stepPanel = elm.find('.step-panel');
                var stepPanel = document.querySelector('.step-panel');

                stepPanelScope.$watch('step', function (step) {
                    if (!step) {
                        return;
                    }

                    stepPanelScope.currentTrainning = stepPanelScope.trainnings[stepPanelScope.step - 1];

                    var contentScope = stepPanelScope.$new(false);
                    loadStepContent(contentScope, {
                        'currentStep': stepPanelScope.step,
                        'trainnings': stepPanelScope.trainnings,
                        'currentTrainning': stepPanelScope.currentTrainning,
                        'trainningInstance': {
                            'nextStep': stepPanelScope.nextStep,
                            'cancel': stepPanelScope.cancel
                        }
                    }).then(function (tplAndVars) {
                        //jqLite的html()方法在此场景不能转成html,垃圾!
                        //elm.find('.popover-content').html($compile(tplAndVars[0])(contentScope));
                        var content = angular.element(document.querySelector('.popover-content'));
                            content.html("");
                            content.append($compile(tplAndVars[0])(contentScope));
                    }).then(function () {
                        var pos = stepPanelScope.currentTrainning.position;
                        adjustPosition(stepPanelScope, stepPanel, pos);
                    });

                });

                //窗口重置事件
                angular.element($window).bind('resize', function () {
                    adjustPosition(stepPanelScope, stepPanel, stepPanelScope.currentTrainning.position);
                });
                stepPanelScope.$on('$destroy', function () {
                    angular.element($window).unbind('resize');
                });


                //获取元素位置
                //setpPos:配置中定义的方位元素 stepPanel:指引模板元素 placement:配置中定义的方位
                function getPositionOnElement(stepScope, setpPos) {
                    return $position.positionElements(angular.element(document.querySelector(setpPos)), stepPanel, stepScope.currentTrainning.placement, true);
                }

                //处理配置中定义的方位
                function positionOnElement(stepScope, setpPos) {
                    var targetPos = angular.isString(setpPos) ? getPositionOnElement(stepScope, setpPos) : setpPos;
                   console.log('Jason test targetPos', targetPos);
                    var positionStyle = stepScope.currentTrainning || {};
                    positionStyle.top = targetPos.top + 'px';
                    positionStyle.left = targetPos.left + 'px';
                    stepScope.positionStyle = positionStyle;
                }

                function adjustPosition(stepScope, stepPanel, pos) {
                    if (!pos) {
                        return;
                    }
                    //利用$injector.invoke动态注入和调用Angular service，
                    // 这样既能获取Angular其他service注入的扩展性，也能获取到函数的动态性。
                    // 如上例中的屏幕居中的自定义扩展方式。
                    var setpPos = angular.isFunction(pos) || angular.isArray(pos) ? $injector.invoke(pos, null, {
                        trainnings: stepScope.trainnings,
                        step: stepScope.setp,
                        currentTrainning: stepScope.currentTrainning,
                        stepPanel: stepPanel
                    }) : pos;

                    //get postion should wait for content setup
                    $timeout(function () {
                        positionOnElement(stepScope, setpPos);
                    });
                }


                function loadStepContent(contentScope, ctrlLocals) {
                    var trainningOptions = contentScope.currentTrainning,
                        getTemplatePromise = function (options) {
                            return options.template ? $q.when(options.template) :
                                $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl, {
                                    cache: $templateCache
                                }).then(function (result) {
                                    return result.data;
                                });
                        },

                        getResolvePromises = function (resolves) {
                            var promisesArr = [];
                            angular.forEach(resolves, function (value) {
                                if (angular.isFunction(value) || angular.isArray(value)) {
                                    promisesArr.push($q.when($injector.invoke(value)));
                                }
                            });
                            return promisesArr;
                        },

                        controllerLoader = function (trainningOptions, trainningScope, ctrlLocals, tplAndVars) {
                            var ctrlInstance;
                            ctrlLocals = angular.extend({}, ctrlLocals || {}, trainningOptions.locals || {});
                            var resolveIter = 1;

                            if (trainningOptions.controller) {
                                ctrlLocals.$scope = trainningScope;
                                angular.forEach(trainningOptions.resolve, function (value, key) {
                                    ctrlLocals[key] = tplAndVars[resolveIter++];
                                });

                                ctrlInstance = $controller(trainningOptions.controller, ctrlLocals);
                                if (trainningOptions.controllerAs) {
                                    trainningScope[trainningOptions.controllerAs] = ctrlInstance;
                                }
                            }

                            return trainningScope;
                        };

                    var templateAndResolvePromise = $q.all([getTemplatePromise(trainningOptions)].concat(getResolvePromises(trainningOptions.resolve || {})));
                    return templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {
                        controllerLoader(trainningOptions, contentScope, ctrlLocals, tplAndVars);
                        return tplAndVars;
                    });
                }

            }
        };
    }]);
