'use strict';

var ApplicationConfiguration = (function() {
	var applicationModuleName = 'codingEra';
	var applicationModuleVendorDependencies = [
		'ngCookies',
		'ngResource',
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',
		'ui.utils',
		'ngFileUpload',
		'ui.select',
		'ngSanitize',
		'ngImgCrop',
		'validation',
		'validation.rule',
		'hc.marked'
	];

	var registerModule = function(moduleName, dependencies) {
		angular.module(moduleName, dependencies || []);

		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();