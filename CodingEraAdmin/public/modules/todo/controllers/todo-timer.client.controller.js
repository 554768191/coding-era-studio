'use strict';

angular.module('todo').controller('timerCtrl', ['$scope', '$interval', "$log",
    function ($scope, $interval, $log) {

        //DEMO1
        var timer;
        //这里有个奇怪的问题,timer如果不定义在方法里面,每次计时都会执行2次回调,并且$interval.cancel(timer)失效.
        $scope.execute = function execute() {
            timer = $interval(function () {
                $log.debug("doing task ... ");
                //}, 150, 10); // 150 ms, 10 times
            }, 1000, 5); // 10000 ms, 2 times
            //}, 1000); // 10000 ms

            timer.then(function () {
                //执行完[预定次数items]后触发
                $log.debug('Jason test success');
            }, function () {
                //
                $log.debug('Jason test error');
            }, function () {
                //每次计时都会触发
                $log.debug('Jason test notify');
            });
        };
        $scope.cancelTimer = function cancelTimer() {
            if (angular.isDefined(timer)) {
                $interval.cancel(timer);
            }
        };

        //DEMO2
        $scope.format = 'yyyy-MM-dd h:mm:ss a';
        $scope.blood_1 = 100;
        $scope.blood_2 = 120;
        var stop;
        $scope.fight = function () {
            // Don't start a new fight if we are already fighting
            if (angular.isDefined(stop)) return;

            stop = $interval(function () {
                $log.debug('Jason test', 12345);
                if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
                    $scope.blood_1 = $scope.blood_1 - 3;
                    $scope.blood_2 = $scope.blood_2 - 4;
                } else {
                    $scope.stopFight();
                }
            }, 100);
        };
        $scope.stopFight = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };
        $scope.resetFight = function () {
            $scope.blood_1 = 100;
            $scope.blood_2 = 120;
        };

        $scope.$on('$destroy', function () {
            // Make sure that the interval is destroyed too 页面销毁后确保计时器取消
            $scope.stopFight();
            $scope.cancelTimer();
        });


        //TEST data list
        $scope.testa = "test1";
        $scope.testb = "test2";
        $scope.testc = "test3";
        $scope.testd = "test4";
        $scope.teste = "test5";
        $scope.testf = "test6";
        $scope.testg = "test7";
    }]);

