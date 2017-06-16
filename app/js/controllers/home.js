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
}])