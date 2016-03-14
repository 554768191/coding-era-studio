/**
 * 请求事件
 */
"use strict";

angular.module('core').factory('ceInterceptor', [ '$rootScope','$q', '$injector','LoadingBar','ceConfig',
    function($rootScope,$q, $injector,LoadingBar,ceConfig) {
    var httpInterceptor = {
        'responseError' : function(response) {
            //GeekUtil.closeLoading();
            //GeekUtil.errorMsg('网络/服务器连接失败,请稍后再试(┬＿┬)');
            //请求失败返回
            return $q.reject(response);
        },
        'response' : function(response) {
            //请求返回
            //LoadingBar.hide();
            //console.log(response.config);
            var url = response.config.url;
            if(response.config.url.indexOf(ceConfig.apiUrl)>=0){
                $rootScope.$emit("stopLoading",url);
            }
            return response;
        },
        'request' : function(config) {
            var url = config.url;
            if(!angular.isDefined(url)){
                //todo 这里最好是弹窗提示,让开发地知道出现问题的原因
                console.log('找不到要请求的URL');
                return;
            }
            if(url.indexOf(ceConfig.apiUrl)>=0){
                $rootScope.$emit("startLoading",url);
            }
            return config;
        },
        'requestError' : function(config){
            //请求失败
            //GeekUtil.closeLoading();
            //GeekUtil.errorMsg('网络/服务器连接失败,请稍后再试(┬＿┬)');
            return $q.reject(config);
        }
    };
    return httpInterceptor;
} ]);