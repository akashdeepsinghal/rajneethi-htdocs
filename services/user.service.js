var app = angular.module('rajneethi');
app.service('userService', function($http) {
    this.getUserDetails = function() {
        return $http.get('/api/details');
    };
    this.createUserDetails = function(userdetails) {
var url = getAPIBaseURL()
        return $http.post( url  +'api/v1/registration', userdetails);

    };
    this.deleteUserDetails = function(id) {
        return $http.delete('/api/details/' + id)
    };
    this.updateUserDetails = function(id, userdetails) {
        return $http.put('/api/details/' + id, userdetails)
    };
    this.loginUser = function(userdetails) {
       return $http.post('http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/api/v1/login', userdetails)

     // return $http.post('http://localhost:8081/api/v1/login', userdetails)

        //$http.post('http://localhost:812/api/v1/login', userdetails)
        //    .then(function successCallback(response) {
        //    console.log(response);
        //    // this callback will be called asynchronously
        //    // when the response is available
        //}, function errorCallback(response) {
        //    // called asynchronously if an error occurs
        //    // or server returns response with an error status.
        //    console.log(response);
        //});

    };
    
});
