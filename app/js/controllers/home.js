'use strict';

angular.module('rajneethiApp')
.controller('HomeCtrl', ['$scope', '$rootScope', 'customHttp', 'docReady', '$location', '$cookies', function ($scope, $root, customHttp, docReady, $location, $cookies){
	console.log('HomeCtrl');
}])
.controller('LoginCtrl',['$scope', '$rootScope', 'customHttp', '$location', '$cookies', function ($scope, $root, customHttp, $location, $cookies){
	console.log('LoginCtrl');
}])
.controller('DashboardCtrl',['$scope', '$rootScope', 'customHttp', '$location', '$cookies', function ($scope, $root, customHttp, $location, $cookies){
	console.log('DashboardCtrl');
	$scope.loaded = false;
	$scope.valid_data = false;
	$scope.projectId = 58;

	console.log('Roles controller');
	loadConstituencyMap();
	function loadConstituencyMap() {
		var url = '/constituencymap/' + $scope.projectId;
		customHttp.get(url, function (response) {
			$scope.loaded = true;
			console.log('response');
			console.log(response);
			if(response){
				$scope.booths = response;
			} else{
				Materialize.toast(response.message, 2000);
			}
		})
	}
}])