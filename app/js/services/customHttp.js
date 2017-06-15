'use strict';

function isUrlComplete(s) {    
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(s);    
}

angular.module('rajneethiApp')
.service('customHttp', ['$http', function ($http) {
	var baseUrl = localStorage.getItem('baseUrl') || 'http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/api/v1';
	console.log('baseUrl in HTTP:- ' + baseUrl);
	this.get = function(url, params, callback){
		if (!callback && typeof params == 'function') {
			callback = params;
			params = null;
		}
		if (!isUrlComplete(url)) {
			url = baseUrl + url; //To search using the important parameters by $stateParams
		}
		console.log(url)
		if (params) {
			url +=  '?' + params;
		}
		$http({
			method : 'GET',
			url : url,
			headers : {
				"Content-Type": 'application/json; charset=utf-8'
			}
		}).then(function (success){
			var response = success.data;
			callback(response);
		}, function (error){
			if (!error.data) {
				Materialize.toast('Server not running');
			}
			var response = error.data;
			callback(response);
		});
	}

	this.post = function(url, params, callback){
		if (!callback && typeof params == 'function') {
			callback = params;
			params = null;
		}
		url = baseUrl + url;
		$http({
			method : 'POST',
			url : url,
			data : params,
			headers : {
				"Content-Type": 'application/json; charset=utf-8'
			}
		}).then(function (success){
			var response = success.data;
			callback(response);
		}, function (error){
			var response = error.data;
			callback(response);
		});
	}

	this.put = function(url, params, callback){
		if (!callback && typeof params == 'function') {
			callback = params;
			params = null;
		}
		url = baseUrl + url;
		$http({
			method : 'PUT',
			url : url,
			data : params,
			headers : {
				"Content-Type": 'application/json; charset=utf-8'
			}
		}).then(function (success){
			var response = success.data;
			callback(response);
		}, function (error){
			var response = error.data;
			callback(response);
		});
	}

	this.delete = function(url, callback){
		url = baseUrl + url;
		$http({
			method : 'DELETE',
			url : url,
			headers : {
				"Content-Type": 'application/json; charset=utf-8'
			}
		}).then(function (success){
			var response = success.data;
			callback(response);
		}, function (error){
			var response = error.data;
			callback(response);
		});
	}
}])