/**
 * Created by Yan on 16/3/9.
 */
'use strict';

var dynamicController = (function(){
    var service = {};
    //初始化头部组
    service.initPageCtrl = function () {

        var pageBtn = $('.point-end.hand');
        var size = $('#dynamic-size').val();
        //data不好使,问题未知

        var template = $('#dynamic-card-template').html();
        var endContainer = $('.point-end-container');

        pageBtn.click(function(){
            var page = pageBtn.data('page');
            pageBtn.addClass('auto-rotate');
            $.ajax({
                url: window.apiURL + '/dynamic/list?size='+size + '&page='+ (Number(page) + 1),
                type:'get',
                dataType:'json',
                success:function(res){
                    for(var i=0;i<res.data.content.length;i++){
                        var data = res.data.content[i];
                        var template = window.template('dynamic-card-template',{dynamic:data});
                        endContainer.before(template);
                       // pageBtn.removeData('page');
                        pageBtn.data('page',res.data.number);
                    }
                    service.initFormat();

                    if(res.data.last){
                        pageBtn.after('<div class="point-end"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span></div>');
                        pageBtn.remove();
                    }
                },
                complete:function(){
                    pageBtn.removeClass('auto-rotate');
                }
            });
        });
    };

    var JUST_NOW = "刚刚",
        SEC_FORMAT = "秒前",
        MIN_FORMAT = "分钟前",
        TODAY_FORMAT = "今天 HH:mm",
        YESTERDAY_FORMAT = "昨天 HH:mm",
        DATE_FORMAT = "DD日 HH:mm",
        YEAR_FORMAT = "MM月DD日 HH:mm",
        ALL_FORMAT = "YYYY月MM日DD HH:mm";
    
    
    service.friendlyTime = function(element, time, timer) {
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
        var processTime = window.moment(time);
        // 2.1 - 年
        var processTime_year = processTime.year();
        // 2.2 - 月 ( 0 - 11 )
        var processTime_month = processTime.month();
        // 2.3 - 日
        var processTime_date = processTime.date();
        // 2.4 - 时 ( 0 - 23 )
        var processTime_hour = processTime.hour();
        // 2.5 - 分 ( 0 - 59 )
        var processTime_minute = processTime.minute();
        // 2.6 - 秒 ( 0 - 59 )
        var processTime_second = processTime.second();

        var formatStr = '';
        if (now_year === processTime_year) { // 同一年
            if (now_month === processTime_month) { // 同一个月
                if (now_date === processTime_date) { // 同一天
                    if (now_hour === processTime_hour) { //同一个小时
                        if (now_minute === processTime_minute) { //同一分钟
                            var duration = now_second - processTime_second;
                            if (duration < 10) {
                                //少于10秒,显示刚刚
                                formatStr = JUST_NOW;
                            } else {
                                //否则显示几秒前
                                formatStr = duration + SEC_FORMAT;
                            }
                            //10秒刷新一次
                            timer = setTimeout(function(){
                                service.friendlyTime(element, time, timer);
                            },10000);
                        } else {
                            // 不是同一分钟,返回多少分钟前
                            var duration_minute = now_minute - processTime_minute;
                            //MIN_FORMAT
                            formatStr = duration_minute + MIN_FORMAT;
                            //一分钟刷新一次
                            timer = setTimeout(function(){
                                service.friendlyTime(element, time, timer);
                            },60000);
                        }
                    } else {
                        // 不是同一个小时,返回「 TODAY_FORMAT 」格式
                        formatStr = processTime.format(TODAY_FORMAT);
                    }
                } else {
                    // 不是同一天
                    var duration_day = now_date - processTime_date;
                    if (duration_day === 1) { // 昨天
                        formatStr = processTime.format(YESTERDAY_FORMAT);
                    } else { // 日期
                        formatStr = processTime.format(DATE_FORMAT);
                    }
                }
            } else {
                // 不是同一个月,返回「 YEAR_FORMAT 」格式
                formatStr = processTime.format(YEAR_FORMAT);
            }
        } else {
            // 不是同一年,返回「 ALL_FORMAT 」格式
            formatStr = processTime.format(ALL_FORMAT);
        }

        element.html(formatStr);


    };



    service.initFormat = function(){


        var hasFormatTimer = $('div[name*="dynamic-time-"][data-timer="0"]');
        hasFormatTimer.each(function(){
            var self = $(this);
            var time = self.data('time');
            var timer;
            service.friendlyTime(self,time,timer);
            self.removeAttr("data-timer");
        });



    };

    return service;
})();





//初始化分页控件
dynamicController.initPageCtrl();
//初始化日期格式
dynamicController.initFormat();