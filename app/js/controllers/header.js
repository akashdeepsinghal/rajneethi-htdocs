'use strict';

angular.module('rajneethiApp')
.controller('AdminHeaderCtrl', ['$scope', '$rootScope', 'customHttp', 'docReady', '$location', '$cookies', function ($scope, $root, customHttp, docReady, $location, $cookies){
	// $scope.url = window.location.pathname;
	// $scope.$watch('url', function(){
	// 	$( ".navTab" ).removeClass( "active" )
	// 	if($scope.url.match("/caste_equation")!=null){
	// 		$scope.activeTab = 'caste_equation';
	// 		$( ".caste_equationTab" ).addClass( "active" );
	// 	} else if($scope.url.match("/about_us")!=null){
	// 		$scope.activeTab = 'about_us';
	// 		$( ".about_usTab" ).addClass( "active" );
	// 	} else if($scope.url.match("/users")!=null){
	// 		$scope.activeTab = 'users';
	// 		$( ".usersTab" ).addClass( "active" );
	// 	}
	// });
}])