'use strict';

var ApplicationConfiguration = (function() {
	var applicationModuleName = 'codingEra';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',
		'ui.utils',
		'pascalprecht.translate',
		'ui.grid',
		'ui.grid.pagination',
		'ngFileUpload'
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