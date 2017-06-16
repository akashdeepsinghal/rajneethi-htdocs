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
				if (response.length) {
				 	getAllCastes(data);
					var map_data = [];
					var latlong = [];
					showPieChart(data[0]);
					for (var i = 0; i < data.length; i++) {
						latlong[i] = data[i].local_booth_panchayat_name;
						$scope.booths.push(data[i].booth_panchayat_name);
						// try {
							if (latlong[i].charAt(0) == '@') {
								var latlong_new = latlong[i].split('@')[1].split(',');
							}
							map_data[i] = {
								latitude: Number(latlong_new[0]),
								longitude: Number(latlong_new[1]),
								booth_name: data[i].booth_panchayat_name,
								caste_percentage: data[i].caste_equation_percentage
							}
					}
					console.log('map_data')
					console.log(map_data)
					initializeMap(map_data);
				} else {
					initializeMap();
					Materialize.toast('No booths in the project', 2000);
				}
			} else{
				Materialize.toast(response.message, 2000);
			}
		})
	}
}])