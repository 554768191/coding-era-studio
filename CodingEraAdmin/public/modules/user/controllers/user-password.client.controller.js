'use strict';

angular.module('user').controller('PasswordController', [
	'$scope', '$stateParams', '$http', '$location', '$uibModalInstance', 'Authentication', 'data',
	function($scope, $stateParams, $http, $location, $uibModalInstance, Authentication, data) {

		var that = $scope;
		that.authentication = Authentication;
		that.item = data.user;
		if(angular.isUndefined(that.credentials)){
			//that.credentials = {username:that.item.username};
		}

		//If user is signed in then redirect back home
		//if (that.authentication.user) $location.path('/');

		// Submit forgotten password account id
		that.askForPasswordReset = function() {
			that.success = that.error = null;

			$http.post('/auth/forgot', that.credentials).success(function(response) {
				// Show user success message and clear form
				//that.credentials = null;
				that.success = response.message;
			}).error(function(response) {
				// Show user error message and clear form
				//that.credentials = null;
				that.error = response.message;
			});
		};

		// Change user password
		that.resetUserPassword = function() {
			that.success = that.error = null;
			$http.post('/auth/reset/' + $stateParams.token, that.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				that.passwordDetails = null;

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