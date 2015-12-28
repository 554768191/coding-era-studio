'use strict';
var ceApp = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//i18n - 国际化配置
ceApp.run(function ($rootScope, $translate) {
	$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
		$translate.refresh();
	});
}).config(['$locationProvider','$httpProvider','$translateProvider','$translatePartialLoaderProvider',
	function($locationProvider,$httpProvider,$translateProvider,$translatePartialLoaderProvider) {
		// Setting HTML5 Location Mode
		$locationProvider.hashPrefix('!');
		$translateProvider.useLoader('$translatePartialLoader', {
			urlTemplate: 'modules/{part}/i18n/{part}-{lang}.json'
		});
		//拦截ajax请求事件
		$httpProvider.interceptors.push('ceInterceptor');
		//解决post跨域问题
		console.log($httpProvider.defaults);
		//$httpProvider.defaults.headers.post['Access-Control-Allow-Headers'] ='x-requested-with';
		//$httpProvider.defaults.headers.post['Access-Control-Allow-Methods'] ='POST, GET, OPTIONS, DELETE';
		//$httpProvider.defaults.headers.post['Access-Control-Allow-Origin'] ='*';
		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/from-data';
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
	apiUrl: "http://localhost:8999/api",
	//grid翻页器公用模板
	paginationTemplate:'modules/core/views/templates/core.pagination.template.html'
});