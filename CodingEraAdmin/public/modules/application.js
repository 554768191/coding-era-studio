'use strict';
var ceApp = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//i18n - 国际化配置
ceApp.run([
	'$rootScope' ,'$templateCache',
	function ($rootScope,$templateCache) {

	}
]).config([
	'$locationProvider','$httpProvider','$logProvider',
	function($locationProvider,$httpProvider,$logProvider) {
		//日志输出模式
		$logProvider.debugEnabled(true);

		// Setting HTML5 Location Mode
		$locationProvider.hashPrefix('!');
		//$translateProvider.useLoader('$translatePartialLoader', {
		//	urlTemplate: 'modules/{part}/i18n/{part}-{lang}.json'
		//});
        //
        //
		//$translatePartialLoaderProvider.addPart('core');
		//$translateProvider.preferredLanguage('zh-cn');
		//$translateProvider.useSanitizeValueStrategy('escaped');
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
	page: 0,//默认当前页
	size: 10,//默认每页大小
	//显示分页数(注意不是最大页数),建议输入单数(暂时也只支持单数....)
	showDisplayPage:5
});