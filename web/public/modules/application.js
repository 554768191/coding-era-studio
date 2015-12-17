'use strict';

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
		$translatePartialLoaderProvider.addPart('core');
		$translateProvider.preferredLanguage('zn-cn');
		$translateProvider.useSanitizeValueStrategy('escaped');
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


