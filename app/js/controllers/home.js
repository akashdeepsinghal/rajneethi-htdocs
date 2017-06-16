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

	function initializeMap(map_data) {
		var map;
		var bounds = new google.maps.LatLngBounds();
		var mapOptions = {
			mapTypeId: 'roadmap'
		};
						
		// Display a map on the page
		map = new google.maps.Map(document.getElementById("default"), mapOptions);
		map.setTilt(45);
			
		// Display multiple markers on a map
		var infoWindow = new google.maps.InfoWindow(), marker, i;
		
		// Loop through our array of markers & place each one on the map  
		for( i = 0; i < map_data.length; i++ ) {

			var booth_name = map_data[i]['booth_name']
			var caste_percentage = map_data[i]['caste_percentage']
			var lat = map_data[i]['latitude']
			var long = map_data[i]['longitude']

			map_data[i].content = "<h5>" + booth_name + '</h5><br>' + caste_percentage

			var position = new google.maps.LatLng(lat, long);
			bounds.extend(position);
			marker = new google.maps.Marker({
				position: position,
				map: map,
				title: booth_name
			});
			
			// Allow each marker to have an info window    
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infoWindow.setContent(map_data[i].content);
					infoWindow.open(map, marker);
				}
			})(marker, i));

			// Automatically center the map fitting all markers on the screen
			map.fitBounds(bounds);
		}

		// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
		var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
			this.setZoom(5);
			google.maps.event.removeListener(boundsListener);
		});
	}
}])