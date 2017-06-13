/// <reference path="views/AllFundsManagement/AllFundsManagement.html" />

var app = angular.module('rajneethi', ['ngRoute', 'ngFileUpload', 'ui.grid', 'ui.grid.pagination','720kb.datepicker']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginController'
        })
        .when('/signup', {
            templateUrl: 'views/signup/signup.html',
            controller: 'signupController'
        })
        .when('/aboutUs', {
            templateUrl: 'views/aboutUs/aboutUs.html',
            controller: 'AboutUsCtrl'
        })
         .when('/careers', {
             templateUrl: 'views/careers/careers.html'
         })

         .when('/clientprofile', {
            templateUrl: 'views/clientProfile/clientProfile.html',
            controller: 'clientProfileCtrl'
        })
         .when('/imageupload', {
            templateUrl: 'views/imageUpload/imageUpload.html',
            controller: 'imageUploadCtrl'
         })

        .when('/form', {
            templateUrl: 'views/form/form.html',
            controller: 'formCtrl'
        })

        .when('/voicesms', {
            templateUrl: 'views/voicesms/voicesms.html',
            controller: 'voicesmsCtrl'
        })

        .when('/transcation', {
            templateUrl: 'views/transcation/transcation.html',
            controller: 'transcationCtrl'
        })

        .when('/report', {
            templateUrl: 'views/report/report.html',
            controller: 'reportCtrl'
        })

        .when('/credit', {
            templateUrl: 'views/credit/credit.html',
            controller: 'creditCtrl'
        })

         .when('/caste-equation/:id', {
            templateUrl: 'views/casteEquation/casteEquation.html',
            controller: 'casteEquationCtrl'
         })
         .when('/history/:id', {
             templateUrl: 'views/history/history.html',
             controller: 'historyCtrl'
         })
        .when('/beneficiary/:id', {
            templateUrl: 'views/beneficiary/beneficiary.html',
            controller: 'beneficiaryCtrl'
        })
         .when('/grievience/:id', {
            templateUrl: 'views/grievience/grievience.html',
            controller: 'grievienceCtrl'
        })
         .when('/addbeneficiary/:id', {
             templateUrl: 'views/add_beneficiary/addbeneficiary.html',
             controller: 'addbeneficiaryCtrl'
         })
         .when('/addgrievience/:id', {
             templateUrl: 'views/addgrievience/addgrievience.html',
             controller: 'addgrievienceCtrl'
         })
        .when('/addcreateproject/:id', {
            templateUrl: 'views/Admin/addcreateproject.html',
            controller: 'addcreateprojectCtrl'
        })
        .when('/createproject/:id', {
            templateUrl: 'views/Admin/createproject.html',
            controller: 'createprojectCtrl'
        })
        .when('/adduser/:id', {
            templateUrl: 'views/Admin/adduser.html',
            controller: 'adduserCtrl'
        })
        .when('/user/:id', {
            templateUrl: 'views/Admin/user.html',
            controller: 'userCtrl'
        })
        .when('/Question/:id', {
            templateUrl: 'views/Admin/Question.html',
            controller: 'QuestionCtrl'
        })
         .when('/addQuestion/:id', {
             templateUrl: 'views/Admin/addQuestion.html',
             controller: 'addQuestionCtrl'
         })

    .when('/manageProject/:userId', {
        templateUrl: 'views/Admin/manageProject.html',
        controller: 'manageProjectCtrl'
    })
        .when('/manageBooth/:userId', {
            templateUrl: 'views/Admin/manageBooth.html',
            controller: 'manageBoothCtrl'
        })
            .when('/addusersupervisor/:userId', {
                templateUrl: 'views/Admin/addusersupervisor.html',
                controller: 'addusersupervisorCtrl'
             })

         .when('/survey/:id', {
             templateUrl: 'views/survey/survey.html',
             controller: 'surveyCtrl'
         })
        .when('/fundsManagent/:id', {
            templateUrl: 'views/FundsManagement/FundsManagement.html',
            controller: 'fundsManagemenCtrl'
        })

        .when('/AllfundsManagent', {
            templateUrl: 'views/AllFundsManagement/AllFundsManagement.html',
            controller: 'AllFundsManagementCtrl'
        })
          .when('/jobs/:id', {
            templateUrl: 'views/jobs/jobs.html',
            controller: 'jobsCtrl'
        })
          .when('/addjobs/:id', {
            templateUrl: 'views/addJobs/addJobs.html',
            controller: 'addjobsCtrl'
        })
           .when('/contact', {
               templateUrl: 'views/contact/contact.html'
           })



           .when('/services', {
               templateUrl: 'views/services/services.html'
           })



        .otherwise({
            redirectTo: '/'
        });
});



app.directive('clientNav', function () {

    //var url = global.settings.getSiteUrl();

    //define the directive object
    var directive = {};

    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';

    //template replaces the complete element with its text. 
    //directive.template = "Student: <b>saddfffgsdgf</b> , Roll No: <b>dfgdfgdfgfdgdf</b>";
    //directive.templateUrl = url + 'views/Admin/headerNav.html',

    directive.templateUrl = 'views/Navs/clientNav.html',

    //scope is used to distinguish each student element based on criteria.
    directive.scope = {
        courseObj: "=course"
    }

    //compile is called during application initialization. AngularJS calls it once when html page is loaded.

    directive.compile = function (element, attributes) {

    }
    return directive;
});
app.directive('adminNav', function () {

    //var url = global.settings.getSiteUrl();

    //define the directive object
    var directive = {};

    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';

    //template replaces the complete element with its text. 
    //directive.template = "Student: <b>saddfffgsdgf</b> , Roll No: <b>dfgdfgdfgfdgdf</b>";
    //directive.templateUrl = url + 'views/Admin/headerNav.html',

    directive.templateUrl = 'views/Navs/adminNav.html',

    //scope is used to distinguish each student element based on criteria.
    directive.scope = {
        courseObj: "=course"
    }

    //compile is called during application initialization. AngularJS calls it once when html page is loaded.

    directive.compile = function (element, attributes) {

    }
    return directive;
});


app.controller('AppController', function ($scope, $location) {
    $scope.HomeRedirect = function () {
        var usr = GetUser(true);
        if (usr) {
            var role = window.localStorage.getItem("ROLE");
            if (role == "Admin") {
                $location.path('/user/1');
            }
            else {
                $location.path('/clientprofile');
            }
        }
    }
});