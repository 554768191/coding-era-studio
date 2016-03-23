'use strict';
var ceApp = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//i18n - 国际化配置
ceApp.run([
	'$rootScope', '$translate','$templateCache',
	function ($rootScope, $translate,$templateCache) {
		$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
			$translate.refresh();
		});
		$templateCache.put('cePaginationTemplate','modules/core/views/templates/core.pagination.template.html');
	}
]).config([
	'$locationProvider','$httpProvider','$translateProvider','$translatePartialLoaderProvider','$logProvider',
	function($locationProvider,$httpProvider,$translateProvider,$translatePartialLoaderProvider,$logProvider) {
		//日志输出模式
		$logProvider.debugEnabled(true);

		// Setting HTML5 Location Mode
		$locationProvider.hashPrefix('!');
		$translateProvider.useLoader('$translatePartialLoader', {
			urlTemplate: 'modules/{part}/i18n/{part}-{lang}.json'
		});


		$translatePartialLoaderProvider.addPart('core');
		$translateProvider.preferredLanguage('zh-cn');
		$translateProvider.useSanitizeValueStrategy('escaped');
	}]);


angular.module('ui.grid.i18n').config([
	'i18nConstants',
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
	//显示分页数(注意不是最大页数),建议输入单数(暂时也只支持单数....)
	showDisplayPage:5
});