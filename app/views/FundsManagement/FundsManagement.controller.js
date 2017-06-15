 var app = angular.module('rajneethi');
 
 app.controller('fundsManagemenCtrl', function ($scope, $routeParams, $http) {

    var projectId = $routeParams.id;
     
     $scope.isEdit = true;
     if (projectId == '-1') {

         $scope.isEdit = false;
         $scope.fundsDetails = {
             projectID: window.localStorage.getItem("projectId"),
             ProjectTitle: '',
             ProjectType: '',
             ProjectSubType: '',
             StartDate: '',
             EndDate: '',
             EstimatedCost: '',
             Expenditure: '',
             Status: '',
             Agency: ''
         }

         
         $scope.buttonshow = true;
     }
     else {
         $scope.buttonshow = false;
         var reqObj = {
             PRCID: "GETFUNDSMANAGDETAILS",
             paramArray: [projectId, window.localStorage.getItem("projectId")]
                 };

                 executeApi(reqObj, function (data){
                     console.log(data);
                     $scope.fundsDetails = data[0];
                     $scope.CopyfundsDetails = $scope.fundsDetails;
                     $scope.GetSubCategory("")
                     $scope.$apply();
                 });
     }
    
     $scope.ProjectType = [
     { id: 1, ProjectType: "Primary Education" },
     { id: 2, ProjectType: "Higher Education" },
     { id: 3, ProjectType: "Sports and Youth Services" },
     { id: 4, ProjectType: "Health" },
     { id: 5, ProjectType: "Development of Women and Child" },
     { id: 6, ProjectType: "Social welfare/Backward Class/Minorities" },
     { id: 7, ProjectType: "Animal Husbandry" },
     { id: 8, ProjectType: "Horticulture" },
     { id: 9, ProjectType: "Home" },
     { id: 10, ProjectType: "Infrastructure developments" },
     { id: 11, ProjectType: "Facilities in notified Slum Areas" },
     { id: 12, ProjectType: "Tourism" },
     { id: 13, ProjectType: "Construction of Samudaya Bhavan" },
     { id: 14, ProjectType: "Construction of Public Library Building and providing mobile" }
     ]


     $scope.SubProjectType = [
         { id: 1, ProjectTypeId: 1, ProjectSubType: "Construction of class rooms" },
     { id: 2,  ProjectTypeId:1, ProjectSubType: "Construction of compound walls" },
     { id: 3,  ProjectTypeId: 1, ProjectSubType: " Construction of full pledged libraries with all necessary equipments" },
     { id: 4,  ProjectTypeId: 1, ProjectSubType: "Construction of laboratories" },
     { id: 5,  ProjectTypeId: 1, ProjectSubType: "Construction of open air theatres" },
     { id: 6,  ProjectTypeId: 1, ProjectSubType: "Construction of cycle stands" },
     { id: 7,  ProjectTypeId: 1, ProjectSubType: "Construction of teachers’ quarters near school" },
     { id: 8,  ProjectTypeId: 1, ProjectSubType: "Providing drinking water facilities like RO" },
     { id: 9,  ProjectTypeId: 1, ProjectSubType: "Providing computers, printers etc" },
     { id: 10, ProjectTypeId: 1, ProjectSubType: "Providing sports and teaching materials" },
     { id: 11, ProjectTypeId: 2, ProjectSubType: "Construction of class rooms" },
     { id: 12, ProjectTypeId: 2, ProjectSubType: "Construction of compound walls" },
     { id: 13, ProjectTypeId: 2, ProjectSubType: "Construction of Libraries, Laboratories and toilets" },
     { id: 14, ProjectTypeId: 2, ProjectSubType: "Providing equipments to Engineering and Medical colleges" },
     { id: 15, ProjectTypeId: 2, ProjectSubType: "Providing drinking water facilities like RO" },
     { id: 16, ProjectTypeId: 2, ProjectSubType: "Providing Infrastructure facilities in the campus (approach road, play ground and canteen etc)" },
     { id: 17, ProjectTypeId: 3, ProjectSubType: "Construction of Stadium" },
     { id: 18, ProjectTypeId: 3, ProjectSubType: "Providing sports materials" },
     { id: 19, ProjectTypeId: 3, ProjectSubType: "Development of jogging track, tennis courts, basket ball courts etc" },
     { id: 20, ProjectTypeId: 4, ProjectSubType: "Construction of additional rooms to PHUs, PHCs, CHCs and taluka hospitals" },
     { id: 21, ProjectTypeId: 4, ProjectSubType: "Construction of compound walls" },
     { id: 22, ProjectTypeId: 4, ProjectSubType: "Providing equipments to hospitals" },
     { id: 23, ProjectTypeId: 4, ProjectSubType: "Establishment of blood banks" },
     { id: 24, ProjectTypeId: 4, ProjectSubType: "Purchase of ambulances" },
     { id: 25, ProjectTypeId: 4, ProjectSubType: "Construction of toilets in the hospitals" },
     { id: 26, ProjectTypeId: 4, ProjectSubType: "Providing Drinking facilities in the Hospitals with RO" },
     { id: 27, ProjectTypeId: 4, ProjectSubType: "Construction of quarters to Medical Officers and ANMs" },
     { id: 28, ProjectTypeId: 5, ProjectSubType: "Providing equipments to physically challenged persons" },
     { id: 29, ProjectTypeId: 5, ProjectSubType: "Construction of Anganwadis" },
     { id: 30, ProjectTypeId: 5, ProjectSubType: "Construction of compound walls to Anganwadis" },
     { id: 31, ProjectTypeId: 5, ProjectSubType: "Providing drinking water facilities with RO" },
     { id: 32, ProjectTypeId: 5, ProjectSubType: " Providing play articles subject to maximum of Rs.5,000/- per Anganwadi" },
     { id: 33, ProjectTypeId: 5, ProjectSubType: "Construction of old age homes, orphanage schools, destitute homes etc" },
     { id: 34, ProjectTypeId: 6, ProjectSubType: "Construction of additional rooms in government hostels" },
     { id: 35, ProjectTypeId: 6, ProjectSubType: "Construction of compound wall to hostels" },
     { id: 36, ProjectTypeId: 6, ProjectSubType: "Providing books and materials to hostel library for post metric students" },
     { id: 37, ProjectTypeId: 6, ProjectSubType: "Providing drinking water supply to hostels" },
     { id: 38, ProjectTypeId: 6, ProjectSubType: "Construction of toilets in hostels" },
     { id: 39, ProjectTypeId: 7, ProjectSubType: "Construction of additional rooms in Veterinary Hospitals, Veterinary" },
     { id: 40, ProjectTypeId: 7, ProjectSubType: "Dispensaries and Primary Veterinary centers" },
     { id: 41, ProjectTypeId: 7, ProjectSubType: "Construction of compound walls around the Veterinary Hospitals, Veterinary Dispensaries and Primary Veterinary centers" },
     { id: 42, ProjectTypeId: 7, ProjectSubType: "Approach road to Livestock Breeding Farms from nearby main road at villages" },
     { id: 43, ProjectTypeId: 7, ProjectSubType: "Construction of staff quarters in the premises of Veterinary Hospitals, Veterinary Dispensaries and Primary Veterinary centers" },
     { id: 44, ProjectTypeId: 7, ProjectSubType: "Construction of shelters for artificial insemination Trevis and Veterinary" },
     { id: 45, ProjectTypeId: 7, ProjectSubType: "Hospitals, Veterinary Dispensaries and Primary Veterinary centers" },
     { id: 46, ProjectTypeId: 7, ProjectSubType: "Construction of artificial insemination center building" },
     { id: 47, ProjectTypeId: 8, ProjectSubType: "Development of parks and gardens in urban areas" },
     { id: 48, ProjectTypeId: 8, ProjectSubType: "Construction of godowns in market yards" },
     { id: 49, ProjectTypeId: 9, ProjectSubType: "Providing Garuda/Hoysala type vehicles to Police department (except driver and maintenance)" },
     { id: 50, ProjectTypeId: 10, ProjectSubType: "Road connectivity: All-weather roads to rural and urban areas" },
     { id: 51, ProjectTypeId: 10, ProjectSubType: "Construction of public electric crematorium at taluk level and providing land for grave yards" },
     { id: 52, ProjectTypeId: 10, ProjectSubType: "Construction of foot bridges" },
     { id: 53, ProjectTypeId: 10, ProjectSubType: "Construction of Bus shelters" },
     { id: 54, ProjectTypeId: 10, ProjectSubType: "Solid waste management" },
     { id: 55, ProjectTypeId: 10, ProjectSubType: "Decentralized solid waste management centers" },
     { id: 56, ProjectTypeId: 11, ProjectSubType: "Providing common sheds to the artisans of slums" },
     { id: 57, ProjectTypeId: 11, ProjectSubType: "Providing infrastructure facilities to rural urban housing colonies" },
     { id: 58, ProjectTypeId: 12, ProjectSubType: "No Option"},
     { id: 59, ProjectTypeId: 13, ProjectSubType: "Providing infrastructure facilities at tourist places" },
     { id: 60, ProjectTypeId: 13, ProjectSubType: "Works relating to beautification/civic facilities in places of Heritage"},
     { id: 61, ProjectTypeId: 14, ProjectSubType: "No Option" },
     { id: 62, ProjectTypeId: 15, ProjectSubType: "No Option" }
     ]

     $scope.Status = ['Ongoing', 'On Hold', 'Not yet started', 'Completed', 'Discontinued'];
     $scope.Agency = ['PWD', 'PRED', 'BBMP', 'BWSSB', 'BDA', 'BMRCL', 'BESCOM', 'Other'];
    

     $scope.Removebeneficiary = function (row, col) {
         swal({
             title: "Are you sure?",
             text: "You Want to delete funds!",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: "Yes, delete it!",
             closeOnConfirm: false
         },
         function () {
             var reqObj = {
                 PRCID: "DELETEFUNDSDETAILS",
                 paramArray: [parseInt($routeParams.id)]
             };

             executeApi(reqObj, function (data) {
                 window.location.href = "#AllfundsManagent";
                 console.log(data);
                 //window.location.reload();
                
                 $scope.gridOptions.data = data;
                 $scope.$apply();
             });


             swal("Deleted!", "Your funds Deleted sucessfully !", "success");
         });
              }

    

     $scope.GetSubCategory = function (categoryId) {
        
         if (categoryId == "") {
             $scope.SubCategory = _.where($scope.SubProjectType, { ProjectTypeId: parseInt($scope.fundsDetails.ProjectType) })
         }
         else {
             $scope.SubCategory = _.where($scope.SubProjectType, { ProjectTypeId: parseInt(categoryId) })
         }


     }

     
     $scope.InsertData = function () {
         var dateOne = new Date($scope.fundsDetails.StartDate); //Year, Month, Date
         var dateTwo = new Date($scope.fundsDetails.EndDate); //Year, Month, Date
         if (dateOne > dateTwo) {
             alert("Start Date can not greather then End Date Two.");
         } else {
             if ($scope.fundsDetails.projectID != '' && $scope.fundsDetails.ProjectTitle != '' && $scope.fundsDetails.ProjectType != '' && $scope.fundsDetails.ProjectSubType != '' && $scope.fundsDetails.StartDate != '' && $scope.fundsDetails.EndDate != '' && $scope.fundsDetails.EstimatedCost != '' &&
                 $scope.fundsDetails.Expenditure != '' && $scope.fundsDetails.Status != '' && $scope.fundsDetails.Agency != '') {
                 var data = _.values($scope.fundsDetails);
                 var reqObj = {
                     PRCID: "ADDVALUEFUNDMANG",
                     paramArray: data
                 };

                 executeApi(reqObj, function (data) {
                     console.log(data);
                     swal("Saved!", "Your FundsManagement saved sucessfully !", "success");
                     window.location.href = "#AllfundsManagent";
                 });
             }
             else {
                 swal("Oops...!", "Fields Can not be null!", "error");
             }
         }
     }

     $scope.UpdateData = function () {
         var data = _.values($scope.fundsDetails);
         var reqObj = {
             PRCID: "UPDATEFUNDMANGDETAIL",
             paramArray: data
         };

         executeApi(reqObj, function (data) {
             console.log(data);
             window.location.href = "#AllfundsManagent";
         });
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