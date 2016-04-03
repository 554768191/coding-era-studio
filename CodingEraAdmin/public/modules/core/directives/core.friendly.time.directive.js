/**
 * Created by Yan on 16/4/3.
 */
"use strict";
angular.module('core').directive("ceFriendlyTime", ["$timeout", function ($timeout) {


    var JUST_NOW = "刚刚",
        SEC_FORMAT = "秒前",
        MIN_FORMAT = "分钟前",
        TODAY_FORMAT = "今天 HH:mm",
        YESTERDAY_FORMAT = "昨天 HH:mm",
        DATE_FORMAT = "DD日 HH:mm",
        YEAR_FORMAT = "MM-DD HH:mm",
        ALL_FORMAT = "YYYY-MM-DD HH:mm";

    function reset(element, time, timer) {
        // 1. 获取当前时间
        var now = window.moment();
        // 1.1 - 年
        var now_year = now.year();
        // 1.2 - 月 ( 0 - 11 )
        var now_month = now.month();
        // 1.3 - 日
        var now_date = now.date();
        // 1.4 - 时 ( 0 - 23 )
        var now_hour = now.hour();
        // 1.5 - 分 ( 0 - 59 )
        var now_minute = now.minute();
        // 1.6 - 秒 ( 0 - 59 )
        var now_second = now.second();

        // 2. 处理时间
        var prossTime = window.moment(time);
        // 2.1 - 年
        var prossTime_year = prossTime.year();
        // 2.2 - 月 ( 0 - 11 )
        var prossTime_month = prossTime.month();
        // 2.3 - 日
        var prossTime_date = prossTime.date();
        // 2.4 - 时 ( 0 - 23 )
        var prossTime_hour = prossTime.hour();
        // 2.5 - 分 ( 0 - 59 )
        var prossTime_minute = prossTime.minute();
        // 2.6 - 秒 ( 0 - 59 )
        var prossTime_second = prossTime.second();

        var formatStr = '';
        if (now_year === prossTime_year) { // 同一年
            if (now_month === prossTime_month) { // 同一个月
                if (now_date === prossTime_date) { // 同一天
                    if (now_hour === prossTime_hour) { //同一个小时
                        if (now_minute === prossTime_minute) { //同一分钟
                            var duration = now_second - prossTime_second;
                            if (duration < 10) {
                                //少于10秒,显示刚刚
                                formatStr = JUST_NOW;
                            } else {
                                //否则显示几秒前
                                formatStr = duration + SEC_FORMAT;
                            }
                            //10秒刷新一次
                            timer = $timeout(function(){
                                reset(element, time, timer);
                            },10000);
                        } else {
                            // 不是同一分钟,返回多少分钟前
                            var duration_minute = now_minute - prossTime_minute;
                            //MIN_FORMAT
                            formatStr = duration_minute + MIN_FORMAT;
                            //一分钟刷新一次
                            timer = $timeout(function(){
                                reset(element, time, timer);
                            },60000);
                        }
                    } else {
                        // 不是同一个小时,返回「 TODAY_FORMAT 」格式
                        formatStr = prossTime.format(TODAY_FORMAT);
                    }
                } else {
                    // 不是同一天
                    var duration_day = now_date - prossTime_date;
                    if (duration_day === 1) { // 昨天
                        formatStr = prossTime.format(YESTERDAY_FORMAT);
                    } else { // 日期
                        formatStr = prossTime.format(DATE_FORMAT);
                    }
                }
            } else {
                // 不是同一个月,返回「 YEAR_FORMAT 」格式
                formatStr = prossTime.format(YEAR_FORMAT);
            }
        } else {
            // 不是同一年,返回「 ALL_FORMAT 」格式
            formatStr = prossTime.format(ALL_FORMAT);
        }


        element.html(formatStr);
    }


    return {
        restrict: "A",
        scope: {time: "=ceFriendlyTime"},
        link: function (scope, element, attrs) {
            var timer;
            scope.$watch("time", function (newVal) {
                reset(element, newVal, timer);
            });

            //reset(element, scope.time, format, timer);
            scope.$on("$destroy", function () {
                $timeout.cancel(timer);
            });
        }
    };
}]);

