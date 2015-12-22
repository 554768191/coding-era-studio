'use strict';
var ceApp = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//i18n - 国际化配置
ceApp.run(function ($rootScope, $translate,Menus,ContentHead) {

	$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
		$translate.refresh();
	});
	//添加导航标题
	$rootScope.$on('$stateChangeSuccess',
			function(event, toState, toParams, fromState, fromParams){
				//展开菜单
				Menus.expandMenuByRoute(toState.name);

				//这是内容标题
				ContentHead.autoRefreshTitle(toState.name);

			});
}).config(['$locationProvider','$httpProvider','$translateProvider','$translatePartialLoaderProvider',
	function($locationProvider,$httpProvider,$translateProvider,$translatePartialLoaderProvider) {
		// Setting HTML5 Location Mode

		$locationProvider.hashPrefix('!');
		$translateProvider.useLoader('$translatePartialLoader', {
			urlTemplate: 'modules/{part}/i18n/{part}-{lang}.json'
		});
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
	apiUrl: "http://localhost:8999/api",
	paginationTemplate:'modules/core/views/templates/pagination.admin.template.html'
});