'use strict';
var ceApp = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//i18n - 国际化配置
ceApp.run([
	'$rootScope' ,'$templateCache',
	function ($rootScope,$templateCache) {

	}
]).config([
	'$locationProvider','$httpProvider','$logProvider','$validationProvider',
	function($locationProvider,$httpProvider,$logProvider,$validationProvider) {
		//日志输出模式
		$logProvider.debugEnabled(true);

		// Setting HTML5 Location Mode
		$locationProvider.hashPrefix('!');

		// 关闭 angular-validation 校验成功提示 ( 成功还提示个毛啊? )
		$validationProvider.showSuccessMessage = false;

		//设置失败时返回 HTML 格式 ( 这里统一使用 bootstrap 的 text-danger 样式 )
		$validationProvider.setErrorHTML(function (msg, element, attrs) {
			// remember to return your HTML
			// eg: return '<p class="invalid">' + msg + '</p>';
			// or using filter
			// eg: return '<p class="invalid">{{"' + msg + '"| lowercase}}</p>';
			return '<p class="text-danger">'+msg+'</p>';
		});

		$validationProvider.validCallback = function(element) {
			var parentFormGroup = $(element).parents('.form-group:first');
			parentFormGroup.removeClass('has-error').addClass('has-success has-feedback');
			$(element).prev('.form-control-feedback').remove();
			$(element).before('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');

		};

		$validationProvider.invalidCallback = function(element) {
			var parentFormGroup = $(element).parents('.form-group:first');
			parentFormGroup.removeClass('has-success').addClass('has-error has-feedback');
			$(element).prev('.form-control-feedback').remove();
			$(element).before('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
		};

		$validationProvider.setValidMethod('submit');

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