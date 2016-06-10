'use strict';

angular.module('user').controller('PasswordController', [
	'$scope', '$stateParams', '$http', '$location', '$uibModalInstance', 'Authentication', 'data', 'UserService',
	function($scope, $stateParams, $http, $location, $uibModalInstance, Authentication, data, UserService) {

		var that = $scope;
		that.authentication = Authentication;
		that.user = data.user;
		if(angular.isUndefined(that.credentials)){
			that.credentials = {username:that.user.username};
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

			var data = that.item;
			data.username = that.user.username;
			UserService.resetUserPassword(data).success(function (res) {
			});
			
			//$http.post('/auth/reset/' + $stateParams.token, that.item).success(function(response) {
			//	// If successful show success message and clear form
			//	that.item = null;
            //
			//	// Attach user profile
			//	//Authentication.user = response;
            //
			//	// And redirect to the index page
			//	//$location.path('/password/reset/success');
			//}).error(function(response) {
			//	that.error = response.message;
			//});
		};
	}
]);