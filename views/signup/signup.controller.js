var app = angular.module('rajneethi');

app.controller('signupController', function($scope, $http, userService) {
	$scope.insertValue = function() {
        userService.createUserDetails($scope.userdetails)
            .success(function(data) {
                $scope.userdetails = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

});
