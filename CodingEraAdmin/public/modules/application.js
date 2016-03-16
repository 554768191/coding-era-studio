'use strict';
var ceApp = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//i18n - 国际化配置
ceApp.run(function ($rootScope, $translate,$templateCache) {
	$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
		$translate.refresh();
	});
	$templateCache.put('cePaginationTemplate','modules/core/views/templates/core.pagination.template.html');
}).config(['$locationProvider','$httpProvider','$translateProvider','$translatePartialLoaderProvider',
	function($locationProvider,$httpProvider,$translateProvider,$translatePartialLoaderProvider) {
		// Setting HTML5 Location Mode
		$locationProvider.hashPrefix('!');
		$translateProvider.useLoader('$translatePartialLoader', {
			urlTemplate: 'modules/{part}/i18n/{part}-{lang}.json'
		});
		//拦截ajax请求事件
		//$httpProvider.interceptors.push('ceInterceptor');
		//解决post,put跨域问题
		var form_encodes_support = ["post", "put"];
		angular.forEach(form_encodes_support,
				function(method) {
					$httpProvider.defaults.headers[method]["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
				});
		var param = function(obj) {
			var name, value, fullSubName, subName, subValue, innerObj, i, query = "";
			for (name in obj) if (value = obj[name], value instanceof Array) {
				for (i = 0; i < value.length; ++i) {
					subValue = value[i];
							fullSubName = name + "[" + i + "]";
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + "&";
				}
			}
			else if (value instanceof Object) {
				for (subName in value) {
					subValue = value[subName];
					fullSubName = name + "[" + subName + "]";
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + "&";
				}
			}
			else if(0 !== value && null !== value){
				query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
			}
			return query.length ? query.substr(0, query.length - 1) : query;
		};

		$httpProvider.defaults.transformRequest = [function(data) {
			return angular.isObject(data) && "[object File]" !== String(data) ? param(data) : data;
		}];

		$translatePartialLoaderProvider.addPart('core');
		$translateProvider.preferredLanguage('zh-cn');
		$translateProvider.useSanitizeValueStrategy('escaped');
	}]);


angular.module('ui.grid.i18n').config(['i18nConstants',
	function(i18nConstants){
		//设置grid默认为中文
		i18nConstants.DEFAULT_LANG='zh-cn';
	}]);



angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	// Fixing google bug with redirect
	if (window.location.href[window.location.href.length - 1] === '#' &&
			// for just the error url (origin + /#)
			(window.location.href.length - window.location.origin.length) === 2) {
			window.location.href = window.location.origin + '/#!';
	}
	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

//项目配置项
ceApp.constant('ceConfig', {
	//接口路径
	apiUrl: "http://localhost:8080/api",
	//apiUrl: "http://www.codingera.com:8080/api",
	//显示分页数(注意不是最大页数),建议输入单数(暂时也只支持单数....)
	showDisplayPage:5

});