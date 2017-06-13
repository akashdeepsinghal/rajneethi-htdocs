'use strict';

angular.module('rajneethi').controller('HomeCtrl', ['$scope','$location',function($scope,$location) {
            $scope.cms = {
                "landing": {
                    "message": "Strategize and stay ahead in polls with rich insights & world class expertise from India's leading poll service provider",
                    "action1": "Login",
                    "action2": "Learn More",
                    "action3": "Signup",
                    "action4": "careers",
                    "loginMessage": "Have an account? "
                }
            };

            $scope.init = function () {

                SetUser(null);

                //var usr = GetUser(true);

                $('.home section').css({
                    'height': $(window).height() + 'px'
                });
                $('nav-bar').hide();

                angular.element(document).ready(function () {
                    $("#landing").backstretch("/assets/images/hero3.png");
                });
               
            };
            $scope.$on('$destroy', function() {
                $('nav-bar').show();
            });

            $scope.login = function(){
                $location.path('/login');
            }
            $scope.login1 = function () {
                $location.path('/careers');
            }
            $scope.SignUp = function () {
                $location.path('/signup');
            }
            $scope.AboutUs = function () {
                $location.path('/aboutUs');
            }
        }
    ]);