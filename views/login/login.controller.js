var app = angular.module('rajneethi');

app.controller('loginController', function($scope, $location, userService) {
    $scope.loginValidUser = function() {
        userService.loginUser($scope.userdetails)
            .success(function(data) {
                // console.log(data)
                // console.log(data._id)
                if (data.message)
                {
                    alert(data.message)
                }
                else {
                    SetUser(data)
                    window.localStorage.setItem("USER", data.username);
                    window.localStorage.setItem("USERid", data.id);
                    var reqObj = {
                        PRCID: "GETUSERROLE",
                        paramArray: [data.id]
                    };

                    executeApi(reqObj, function (data) {
                        console.log(data);
                        if (data[0].role == "Admin") {
                            window.localStorage.setItem("ROLE", "Admin");
                            $location.path('/user/1');
                            $scope.$apply();
                        } else if (data[0].role == "Client") {
                            window.localStorage.setItem("ROLE", "Client");
                           $location.path('/clientprofile');
                           $scope.$apply();
                           // window.location.href = '/#/clientprofile';
                        }
                        else {
                            alert('You are not allow to access the system...')
                        }
                    });
                    
                }

               
            })
            .error(function(data, status) {
                console.log(status)
                if (status == 404) {
                    $scope.error = 'Invalid Username and Password!';
                }

            });

    }
});


// app.run(function($rootScope, $location) {
//     $rootScope.$on('$locationChangeSuccess', function() {
//         if($rootScope.previousLocation == $location.path()) {
//             alert("1111111111111111111")
//             alert($location.path())
//             console.log("Back Button Pressed");
//         }
//         $rootScope.previousLocation = $rootScope.actualLocation;
//         $rootScope.actualLocation = $location.path();
//     });
// });

