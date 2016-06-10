'use strict';

angular.module('user').controller('OpenPasswordController', [
	'$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {

		var that = $scope;
		that.authentication = Authentication;

		that.onOpenResetUserPasswordClick = function() {
			that.success = that.error = null;
			$http.post('/auth/reset/' + $stateParams.token, that.item).success(function(response) {
				// If successful show success message and clear form
				that.item = null;

				// Attach user profile
				//Authentication.user = response;

				// And redirect to the index page
				//$location.path('/password/reset/success');

			}).error(function(response) {
				that.error = response.message;
			});
		};
	}

]);