'use strict';

angular.module('rajneethiApp')
.controller('HomeCtrl', ['$scope', '$rootScope', 'customHttp', 'docReady', '$location', '$cookies', function ($scope, $root, customHttp, docReady, $location, $cookies){
	console.log('HomeCtrl');
	if ($cookies.get('username')) {
		$root.username = $cookies.get('username');
		$location.path('/dashboard');
	}
}])
.controller('LoginCtrl',['$scope', '$rootScope', 'customHttp', '$location', '$cookies', function ($scope, $root, customHttp, $location, $cookies){
	console.log('LoginCtrl');

	if ($cookies.get('username')) {
		$root.username = $cookies.get('username');
		$location.path('/dashboard');
	}

	$scope.login = function () {
		console.log('$scope.username')
		console.log($scope.username)
		console.log('$scope.password')
		console.log($scope.password)
		if (!$scope.username) {
			Materialize.toast('Please enter username', 2000);
			return;
		}
		if (!$scope.password) {
			Materialize.toast('Please enter password', 2000);
			return;
		}
		var userdetails = {
			username: $scope.username,
			password: $scope.password
		}
		var url = '/login';
		customHttp.post(url, userdetails, function (response) {
			$scope.loaded = true;
			console.log('response');
			console.log(response);
			if(response){
				if (response.token) {
					response.message = 'User Logged in successfully';
					window.localStorage.setItem('username', response.username);
					$cookies.put('username', response.username);
					$location.path('/dashboard');
				}
				Materialize.toast(response.message, 2000);
			} else{
				Materialize.toast(response.message, 2000);
			}
		})
	}
}])
.controller('DashboardCtrl',['$scope', '$rootScope', 'customHttp', '$location', '$cookies', function ($scope, $root, customHttp, $location, $cookies){

	console.log('DashboardCtrl');
	console.log($cookies)
	console.log('$cookies.get')
	console.log($cookies.get('username'))

	// if (!window.localStorage.getItem('username')) {
	// 	$location.path('/login');
	// }
	// if ($cookies.get('username')) {
	// 	if (!window.localStorage.getItem('username')) {
	// 		window.localStorage.setItem('username', $cookies.get('username'))
	// 	}
	// }


	if (!$cookies.get('username')) {
		// if (!window.localStorage.getItem('username')) {
		// 	window.localStorage.setItem('username', $cookies.get('username'))
		// }
		$location.path('/login');
	}





	$scope.loaded = false;
	$scope.valid_data = false;
	$scope.projectId = 58;
	$scope.booths = [];



	$scope.pieOptions = {
		chart: {
			type: 'pieChart',
			height: 500,
			x: function(d){return d.key;},
			y: function(d){return d.y;},
			showLabels: true,
			duration: 500,
			labelThreshold: 0.01,
			labelSunbeamLayout: true,
			legend: {
				margin: {
					top: 5,
					right: 20,
					bottom: 5,
					left: 0
				}
			}
		}
	};

	console.log('Roles controller');
	loadConstituencyMap();
	function loadConstituencyMap() {
		var url = '/constituencymap/' + $scope.projectId;
		customHttp.get(url, function (data) {
			$scope.loaded = true;
			console.log('data');
			console.log(data);
			if(data){
				$scope.booths = data;
				if (data.length) {
					$scope.castes = getAllCastes(data)
				 	console.log('$scope.castes')
				 	console.log($scope.castes)
					var map_data = [];
					var latlong = [];
					showPieChart(data[0]);
					console.log('data.length');
					console.log(data.length);
					for (var i = 0; i < data.length; i++) {
						// $scope.booths.push(data[i].booth_panchayat_name);
						latlong[i] = data[i].local_booth_panchayat_name;
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



	function getAllCastes(booths) {
		var castes = [];
		var data = booths[0].caste_equation_percentage.split("_");
		data.forEach(function(item, index) {
			if (!parseInt(item)) {
				castes.push(item);
			}
		});
		// console.log($scope.castes);
		console.log('$scope.castes')
		console.log($scope.castes)

      return castes.map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
	}

	function filterCastes (query) {
		console.log('query')
		console.log(query)
		var results = query ? $scope.castes.filter( createFilterFor(query) ) : $scope.castes;
		console.log();
		return results;
	}

	function showPieChart(booth) {
		console.log('getCastesAndPercentages(booth)');
		console.log('booth')
		console.log(booth)
		console.log(getCastesAndPercentages(booth));
		$scope.pieData = getCastesAndPercentages(booth);
		console.log($scope.pieData)
		console.log('$scope.pieData')
	}

	function getCastesAndPercentages(booth) {
		var data = booth.caste_equation_percentage.split("_");
		var d = [];
		data.forEach(function(item, index) {
			if (isOdd(index)) {
				d.push(parseInt(item))
			} else {
				d.push(item)
			}
		});
		console.log('d to be chunked')
		console.log(d)
		var result = object_chunk(d, 2);
		return result;
	}

	function isOdd(n) {
		return n % 2 != 0;
	}

	function chunk(arr, chunkSize) {
		chunkSize = chunkSize || 2;
		var R = [];
		for (var i = 0, len = arr.length; i < len; i += chunkSize) {
			R.push(arr.slice(i, i + chunkSize));
		}
		return R;
	}

	function object_chunk(arr) {
		var pieData = [];
		var chunkedArray = chunk(arr);
		console.log('chunkedArray');
		console.log(chunkedArray);

		for (var i = 0; i < chunkedArray.length; i ++) {
			pieData[i] = {
				key: chunkedArray[i][0],
				y: chunkedArray[i][1]
			}
		}
		console.log('pieData');
		console.log(pieData);
		return(pieData);
	}

	$scope.showchart = function () {
		Materialize.toast('We will have the filtering soon', 2000);
	}

// $scope.searchQuery = function (searchText) {
// 	var users = [];
// 	angular.forEach($scope.users, function (value, key) {
// 	value = user object // key = userId var dN = value["display_name"]; if (dN) { var obj = {}; obj[key] = value; obj["display"] = dN; if (dN.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) { users.push(obj); } } }); return users; }

	// console.log(loadAll())
 //    function loadAll() {
 //      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
 //              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
 //              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
 //              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
 //              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
 //              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
 //              Wisconsin, Wyoming';

 //      return $scope.castes.map( function (state) {
 //        return {
 //          value: state.toLowerCase(),
 //          display: state
 //        };
 //      });
 //    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

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