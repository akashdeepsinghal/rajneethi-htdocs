'use strict';

var rajneethiApp = angular.module('rajneethiApp', ['ui.router', 'ngCookies']);

rajneethiApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider){
	
	$urlRouterProvider.when('/login/','/login');
	$urlRouterProvider.when('/accounting','/accounting/index');
	$urlRouterProvider.when('/acl','/acl/roles');
	$urlRouterProvider.when('/microservices','/microservices/index');
	$urlRouterProvider.when('/users','/users/unityUsers');
	$urlRouterProvider.when('/inventory','/inventory/index');
	$urlRouterProvider.when('/admin','/admin/index');
	$urlRouterProvider.otherwise('/home');
	$locationProvider.html5Mode(true);

	$stateProvider


// ********************ACL Dashboard***************************
//Home
		.state('home', {
			url: '/',
			templateUrl: '/views/home/index.html',
			controller: 'HomeCtrl'
		})
//Login Page
		.state('login', {
			url: '/login',
			templateUrl: '/views/session/login.html',
			controller: 'LoginCtrl',
		})
//Dashboard
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/views/home/dashboard.html',
			controller: 'DashboardCtrl'
		})

//Rest Of the State Definitions Go here
//ACL Section
		.state('acl', {
			url : '/acl',
			templateUrl : '/views/acl/home.html',
			controller : 'AclHomeCtrl'
		})
		.state('acl.index', {
			url : '/index',
			templateUrl : '/views/acl/index.html',
			controller : 'AclIndexCtrl'
		})
		.state('acl.roles', {
			url : '/roles',
			templateUrl : '/views/acl/roles.html',
			controller : 'RolesCtrl'
		})
		.state('acl.role', {
			url : '/roles/:role_id',
			templateUrl : '/views/acl/role-view.html',
			controller : 'RoleViewCtrl'
		})
		// .state('acl.endpoint', {
		// 	url : '/endpoints/:endpoint_id',
		// 	templateUrl : '/views/acl/endpoint-view.html',
		// 	controller : 'EndpointViewCtrl'
		// })
		.state('acl.endpoints', {
			url : '/endpoints',
			templateUrl : '/views/acl/endpoints.html',
			controller : 'EndpointsCtrl'
		})
		.state('acl.newendpoint', {
			url : '/endpoints/new',
			templateUrl : '/views/acl/newendpoint.html',
			controller : 'NewEndpointCtrl'
		})
		.state('acl.mapping', {
			url : '/mapping',
			templateUrl : '/views/acl/mapping.html',
			controller : 'MappingsCtrl'
		})
		.state('acl.newmap', {
			url : '/newmap',
			templateUrl : '/views/acl/newmap.html',
			controller : 'NewMapCtrl'
		})
		.state('acl.redismap', {
			url : '/redismap',
			templateUrl : '/views/acl/redis-aclmap.html',
			controller : 'RedisACLMapCtrl'
		})




//Microservices Section
		.state('microservices', {
			url : '/microservices',
			templateUrl : '/views/microservices/home.html',
			controller : 'MicroservicesHomeCtrl'
		})
		.state('microservices.index', {
			url : '/index',
			templateUrl : '/views/microservices/microservices.html',
			controller : 'MicroservicesIndexCtrl'
		})
		// .state('microservices.microservice', {
		// 	url : '/microservices/:microservice_id',
		// 	templateUrl : '/views/microservices/microservice-view.html',
		// 	controller : 'RoleViewCtrl'
		// })
		// .state('microservices.newmicroservice', {
		// 	url : '/microservices/new',
		// 	templateUrl : '/views/microservices/newmicroservice.html',
		// 	controller : 'NewEndpointCtrl'
		// })


//Consumers Section
		.state('users', {
			url : '/users',
			templateUrl : '/views/users/home.html',
			controller : 'UsersHomeCtrl'
		})
		.state('users.consumers', {
			url : '/consumers',
			templateUrl : '/views/users/consumers.html',
			controller : 'ConsumersCtrl'
		})
		.state('users.artists', {
			url : '/artists',
			templateUrl : '/views/users/artists.html',
			controller : 'ArtistsCtrl'
		})
		.state('users.unityUsers', {
			url : '/unityUsers',
			templateUrl : '/views/users/unityUsers.html',
			controller : 'UnityUsersCtrl'
		})
});