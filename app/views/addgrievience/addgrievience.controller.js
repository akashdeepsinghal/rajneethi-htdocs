 var app = angular.module('rajneethi');
 
 app.controller('addgrievienceCtrl', function ($scope, $routeParams, $http) {
     var projectId = $routeParams.id;

     $scope.isEdit = true;
     if (projectId == '-1') {
         $scope.isEdit = false;
         $scope.grievienceDetails = {
             projectID:  window.localStorage.getItem("projectId"),
             Title: '',
             Name: '',
             VoterID: '',
             Date: '',
             Type: '',
             SubType: '',
             Remarks: '',
             Priority: '',
             SLATime: '',
             Status: '',
             Rewards: ''
            
         }
         $scope.buttonshow = true;
     }
     else {
         $scope.buttonshow = false;
         var reqObj = {
             PRCID: "GETGRIVIENCEDETAILS",
             paramArray: [projectId, window.localStorage.getItem("projectId")]
                 };

                 executeApi(reqObj, function (data){
                     console.log(data);
                     $scope.grievienceDetails = data[0];
                     $scope.GetSubCategory("")
                     $scope.$apply();
                 });
     }
    


     $scope.ProjectType = [
         { id: 1, ProjectType: "Admin" },
     { id: 2, ProjectType: "Advertisement" },
     { id: 3, ProjectType: "Animal control" },
     { id: 4, ProjectType: "Education" },
     { id: 5, ProjectType: "Engineering" },
     { id: 6, ProjectType: "Estate" },
     { id: 7, ProjectType: "Forest" },
     { id: 8, ProjectType: "Health" },
     { id: 9, ProjectType: "Lakes" },
     { id: 10, ProjectType: "Legal Cell" },
     { id: 11, ProjectType: "Markets" },
     { id: 12, ProjectType: "Revenue" },
     { id: 13, ProjectType: "Town Planning" },
     { id: 14, ProjectType: "Welfare" },
     { id: 15, ProjectType: "BWSSB" },
     { id: 16, ProjectType: "Police" },
     { id: 17, ProjectType: "Traffic" },
     { id: 18, ProjectType: "Waste Management" },
      { id: 19, ProjectType: "Horticulture"}
     ]


     $scope.SubProjectType = [
         { id: 1, ProjectTypeId: 1, ProjectTypeName: "Admin", ProjectSubType: "Other" },
     { id: 2,  ProjectTypeId:1,  ProjectTypeName: "Admin", ProjectSubType: "Construction of compound walls" },
     { id: 3, ProjectTypeId: 2,ProjectTypeName: "Advertisement", ProjectSubType: "Other" },
     { id: 4, ProjectTypeId: 2,ProjectTypeName: "Advertisement", ProjectSubType: "Advertisement Related" },
     { id: 5, ProjectTypeId: 3,ProjectTypeName: "Animal control", ProjectSubType: "Corruption" },
     { id: 6, ProjectTypeId: 3,ProjectTypeName: "Animal control", ProjectSubType: "Animal Health" },
     { id: 7, ProjectTypeId: 3,ProjectTypeName: "Animal control", ProjectSubType: "Animal and Pest Control" },
     { id: 8, ProjectTypeId: 3,ProjectTypeName: "Animal control", ProjectSubType: "Illegal Activity" },
     { id: 9, ProjectTypeId: 3,ProjectTypeName: "Animal control", ProjectSubType: "Other" },
     { id: 10, ProjectTypeId: 4,ProjectTypeName: "Education", ProjectSubType: "Education Planning" },
     { id: 11, ProjectTypeId: 4,ProjectTypeName: "Education", ProjectSubType: "Other" },
     { id: 12, ProjectTypeId: 4,ProjectTypeName: "Education", ProjectSubType: "Education Resource" },
     { id: 13, ProjectTypeId: 5,ProjectTypeName: "Engineering", ProjectSubType: "Road Maintainence" },
     { id: 14, ProjectTypeId: 5,ProjectTypeName: "Engineering", ProjectSubType: "Street Infrastructure" },
     { id: 15, ProjectTypeId: 5,ProjectTypeName: "Engineering", ProjectSubType: "Construction Related" },
     { id: 16, ProjectTypeId: 5,ProjectTypeName: "Engineering", ProjectSubType: "Illegal Structure" },
     { id: 17, ProjectTypeId: 5,ProjectTypeName: "Engineering", ProjectSubType: "Other" },
     { id: 18, ProjectTypeId: 5,ProjectTypeName: "Engineering", ProjectSubType: "Dangerous Condition" },
     { id: 19, ProjectTypeId: 6,ProjectTypeName: "Estate" , ProjectSubType: "Dangerous Condition" },
     { id: 20, ProjectTypeId: 6,ProjectTypeName: "Estate" , ProjectSubType: "Other" },
     { id: 21, ProjectTypeId: 7,ProjectTypeName: "Forest", ProjectSubType: "Illegal Activity" },
     { id: 22, ProjectTypeId: 7,ProjectTypeName: "Forest", ProjectSubType: "Other" },
     { id: 23, ProjectTypeId: 7,ProjectTypeName: "Forest", ProjectSubType: "Dangerous Condition" },
     { id: 24, ProjectTypeId: 7,ProjectTypeName: "Forest", ProjectSubType: "Pollution Related" },
     { id: 25, ProjectTypeId: 8,ProjectTypeName: "Health", ProjectSubType: "Other" },
     { id: 26, ProjectTypeId: 8,ProjectTypeName: "Health", ProjectSubType: "Health Related" },
     { id: 27, ProjectTypeId: 9,ProjectTypeName: "Lakes", ProjectSubType: "Other" },
     { id: 28, ProjectTypeId: 9,ProjectTypeName: "Lakes", ProjectSubType: "Dangerous Condition" },
     { id: 29, ProjectTypeId: 9,ProjectTypeName: "Lakes", ProjectSubType: "Illegal Activity" },
     { id: 30, ProjectTypeId: 9,ProjectTypeName: "Lakes", ProjectSubType: "Pollution Related" },
     { id: 31, ProjectTypeId: 10,ProjectTypeName: "Legal Cell", ProjectSubType: "Other" },
     { id: 32, ProjectTypeId: 10,ProjectTypeName: "Legal Cell", ProjectSubType: "Corruption" },
     { id: 33, ProjectTypeId: 11,ProjectTypeName: "Markets", ProjectSubType: "Illegal Activity" },
     { id: 34, ProjectTypeId: 11,ProjectTypeName: "Markets", ProjectSubType: "Other" },
     { id: 35, ProjectTypeId: 11,ProjectTypeName: "Markets", ProjectSubType: "Solid Waste Related" },
     { id: 36, ProjectTypeId: 11,ProjectTypeName: "Markets", ProjectSubType: "Pollution Related" },
     { id: 37, ProjectTypeId: 12,ProjectTypeName: "Revenue", ProjectSubType: "Other"},
     { id: 38, ProjectTypeId: 12,ProjectTypeName: "Revenue", ProjectSubType: "Property Tax Related"},
     { id: 39, ProjectTypeId: 12,ProjectTypeName: "Revenue", ProjectSubType: "Corruption"},
     { id: 40, ProjectTypeId: 12,ProjectTypeName: "Revenue", ProjectSubType: "Information Request"},
     { id: 41, ProjectTypeId: 13,ProjectTypeName: "Town Planning", ProjectSubType: "Other" },
     { id: 42, ProjectTypeId: 13,ProjectTypeName: "Town Planning", ProjectSubType: "Corruption" },
     { id: 43, ProjectTypeId: 13,ProjectTypeName: "Town Planning", ProjectSubType: "Building Plans"},
     { id: 44, ProjectTypeId: 14,ProjectTypeName: "Welfare", ProjectSubType: "Welfare Related" },
     { id: 45, ProjectTypeId: 14,ProjectTypeName: "Welfare", ProjectSubType: "Corruption" },
     { id: 46, ProjectTypeId: 14,ProjectTypeName: "Welfare", ProjectSubType: "Other" },
     { id: 47, ProjectTypeId: 15,ProjectTypeName: "BWSSB", ProjectSubType: "RTI Request" },
     { id: 48, ProjectTypeId: 15,ProjectTypeName: "BWSSB", ProjectSubType: "Supply" },
     { id: 49, ProjectTypeId: 15, ProjectTypeName: "BWSSB",ProjectSubType: "Corruption" },
     { id: 50, ProjectTypeId: 15,ProjectTypeName: "BWSSB", ProjectSubType: "Maintainance" },
     { id: 51, ProjectTypeId: 15,ProjectTypeName: "BWSSB", ProjectSubType: "Other" },
     { id: 52, ProjectTypeId: 16,ProjectTypeName: "Police" , ProjectSubType: "POLICE" },
     { id: 53, ProjectTypeId: 16,ProjectTypeName: "Police" , ProjectSubType: "Other" },
     { id: 53, ProjectTypeId: 17,ProjectTypeName: "Traffic", ProjectSubType: "Other" },
     { id: 54, ProjectTypeId: 17,ProjectTypeName: "Traffic", ProjectSubType: "TRAFFIC" },
     { id: 55, ProjectTypeId: 18,ProjectTypeName: "Waste Management", ProjectSubType: "Other" },
     { id: 56, ProjectTypeId: 18,ProjectTypeName: "Waste Management", ProjectSubType: "Illegal Activity" },
     { id: 57, ProjectTypeId: 18,ProjectTypeName: "Waste Management", ProjectSubType: "Health Related" },
     { id: 58, ProjectTypeId: 18,ProjectTypeName: "Waste Management", ProjectSubType: "Solid Waste Related" },
     { id: 59, ProjectTypeId: 19, ProjectTypeName: "Horticulture", ProjectSubType: "Other" },
     { id: 60, ProjectTypeId: 19, ProjectTypeName: "Horticulture", ProjectSubType: "Dangerous Condition" },
     { id: 61, ProjectTypeId: 19, ProjectTypeName: "Horticulture", ProjectSubType: "Park Improvement" }

     ]
     $scope.Status = ['Resolved', 'Ongoing', 'On hold', 'Can’t be Resolved'];
     $scope.Agency = ['High', 'Average', ' Low'];
    

     $scope.Removebeneficiary = function (row, col) {
         swal({
             title: "Are you sure?",
             text: "You Want to delete Grievience details!",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: "Yes, delete it!",
             closeOnConfirm: false
         },
         function () {
             var reqObj = {
                 PRCID: "DELETEGRIVIENCE",
                 paramArray: [parseInt($routeParams.id)]
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                 window.location.href = "#grievience/1";
                 // window.location.reload();
                 //$scope.gridOptions.data = data;

                 //$scope.$apply();
             });


             swal("Deleted!", "Your Grievience details Deleted sucessfully !", "success");
         });

     }

    

     $scope.GetSubCategory = function (categoryId) {
        
         if (categoryId == "") {
             $scope.SubCategory = _.where($scope.SubProjectType, { ProjectTypeName: $scope.grievienceDetails.Type })
         }
         else {
             $scope.SubCategory = _.where($scope.SubProjectType, { ProjectTypeName: categoryId})
         }


     }

     
     $scope.InsertData = function () {
         if ($scope.grievienceDetails.Title != "") {
             var data = _.values($scope.grievienceDetails);
             var reqObj = {
                 PRCID: "CREATEGRIVIENCE",
                 paramArray: data
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                 window.location.href = "#grievience/1";
             });
         }
         else
         {
             alert("Project Title Can Not Be Null");
             //window.location.href = "#grievience/1";
         }
     }
     $scope.UpdateData = function () {
         var data = _.values($scope.grievienceDetails);
         var reqObj = {
             PRCID: "UPDATEGRIVIENCEDEATIS",
             paramArray: data
         };

         executeApi(reqObj, function (data) {
             console.log(data);
             window.location.href = "#grievience/1";
         });
     }

     $scope.reload = function () {
             location.reload();
       }
   

     //$scope.TestApiCall = function () {
     //    var reqObj = {
     //        PRCID: "ELECTIONHISTORIES",
     //        paramArray: [10]
     //    };

     //    executeApi(reqObj, function (data){
     //        console.log(data);
     //    });
     //}

     //$scope.TestApiCall();
 });