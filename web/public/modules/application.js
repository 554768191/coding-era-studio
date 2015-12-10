'use strict';

//Start by defining the main module and adding the module dependencies
var ceApp = angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

//i18n - 国际化配置
ceApp.run(function ($rootScope, $translate) {
	$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
		$translate.refresh();
	});
});

//ceApp.all('*', function (req, res, next) {
//	res.header("Access-Control-Allow-Origin", CeConfig.apiUrl);
//	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//	res.header("X-Powered-By", ' 3.2.1');
//	res.header("Content-Type", "application/json;charset=utf-8");
//	next();
//});

ceApp.config(['$httpProvider','$translateProvider','$translatePartialLoaderProvider',
	function($httpProvider,$translateProvider,$translatePartialLoaderProvider) {

		$translateProvider.useLoader('$translatePartialLoader', {
			urlTemplate: 'modules/{part}/i18n/{part}-{lang}.json'
		});
		$translatePartialLoaderProvider.addPart('core');
		$translateProvider.preferredLanguage('zn-cn');
		$translateProvider.useSanitizeValueStrategy('escaped');
	}]);


// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
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
