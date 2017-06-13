 var app = angular.module('rajneethi');
 
 app.controller('addQuestionCtrl', function ($scope, $routeParams, $http) {
     $scope.projectId = $routeParams.id;
     if ($scope.projectId == '-1') {

         $scope.equestionDetails = {
             
             constituencyId:'',
             name:'', 
             data: '{"order":14,"attributeName":"affiliation","supportAggregation":"true","questionType":"singleChoice","cotainsAttachment":"false","aggregationDisplay":"Affiliation","title":"Affiliation","questionText":"Which side is the voter inclined to vote?","answerChoices":["Favours us","Neutral","Favours opponent","Refuse to answer","Not available at home"]}',
             DisplayType: '',
             Activation:'',
             mandatoryFlag: ''

         }
         $scope.question = {
             order: 2,
             attributeName: "",
             supportAggregation:'' ,
             questionType: "",
             cotainsAttachment: '',
             aggregationDisplay: "",
             title: "",
             questionText: "",
             mandatoryFlag: '',
             answerChoices: []
         }
         $scope.showbutton = false;
         
         $scope.ansch = []
         $scope.buttonshow = true;
     }
     else {
         $scope.showbutton = true;
         $scope.buttonshow = false;
         var reqObj = {
             PRCID: "GETPROFILEEQUSTION",
             paramArray: [$scope.projectId]
                 };

         executeApi(reqObj, function (data) {
             $scope.ansch = [];
                     console.log(data);
                     $scope.equestionDetails = data[0];
                     $scope.question = JSON.parse($scope.equestionDetails.data);
                     //$scope.ansch = $scope.question.answerChoices;
                     for (var i = 0; i < $scope.question.answerChoices.length; i++) {
                         var obj = {
                             text: $scope.question.answerChoices[i],
                             id: i + 1
                         }
                         $scope.ansch.push(obj);
                     }
                     $scope.$apply();
                 });
     }
    
     var reqObj = {
         PRCID: "GETCONSTITUENCY",
         paramArray: []
     };

     executeApi(reqObj, function (data) {
         $scope.constituency = data;
        
        
         $scope.$apply();
     });
     $scope.Status = ['PartyWorker', 'Supervisor'];
     $scope.Agency = ['High', 'Average', ' Low'];
    

     $scope.AddChoices = function () {
         var obj = {
             text: '',
             id: $scope.ansch.length+1
         }

         $scope.ansch.push(obj);
     }
     $scope.RemoveChoices = function (index) {
         $scope.ansch = _.reject($scope.ansch, function (num) { return num.id == index; });
       
     }
     $scope.GetSubCategory = function (categoryId) {
        
         if (categoryId == "") {
             $scope.SubCategory = _.where($scope.SubProjectType, { ProjectTypeName: $scope.grievienceDetails.Type })
         }
         else {
             $scope.SubCategory = _.where($scope.SubProjectType, { ProjectTypeName: categoryId})
         }


     }
     $scope.showhidebutton = function (questionType) {
         $scope.showbutton = false;
         if (questionType == "singleinput" || questionType == "phoneinput") {
             $scope.showbutton = true;
         }
     }
     
     $scope.InsertData = function () {

         for (var i = 0; i < $scope.ansch.length; i++) {
             $scope.question.answerChoices.push($scope.ansch[i].text);
         }
         if ($scope.validation()) {
             
             // $scope.json = angular.toJson($scope.question);
             $("#loadingModal").show();
           
              var reqObjOrder = {
                 PRCID: "GETPROFILEEQUSTIONMAXID",
                 paramArray: []
             };
             executeApi(reqObjOrder, function (data1) {
                 console.log(data1);
                 $scope.question.order = data1[0].maxId + 1;
                 $scope.question.mandatoryFlag = $scope.equestionDetails.mandatoryFlag;
                 $scope.equestionDetails.data = angular.toJson($scope.question);
                 var data = _.values($scope.equestionDetails);


                 var reqObj = {
                    PRCID: "INSERTPROFILEEQUSTION",
                     paramArray: data
                 };
                 executeApi(reqObj, function (data) {
                     console.log(data);
                     $("#loadingModal").hide();
                     swal("Sucess!", " Create ProfileQuestion sucessfully !", "success");
                     window.location.href = "#Question/1";
                 });
                 //$("#loadingModal").hide();
                 //swal("Sucess!", " Create ProfileQuestion sucessfully !", "success");
                 //window.location.href = "#Question/1";
             });
             
             
         }
         else {
             swal("error!", "Field Cannot be null", "error");
         }
     }
    
     $scope.validation=function(){
         if ($scope.equestionDetails.constituencyId != '' && $scope.equestionDetails.name != '' && $scope.equestionDetails.DisplayType != '' && $scope.question.attributeName != '' && $scope.question.supportAggregation != ''
             && $scope.question.cotainsAttachment != '' && $scope.question.aggregationDisplay != '' && $scope.question.title != '') {
             if ($scope.showbutton) {
                 
                 return true;
             } else {
                 if ($scope.question.answerChoices.length != 0) {
                     return true
                 } else {

                     return false;
                 }
             }
         }
         else
             return false;
     }

     $scope.UpdateData = function () {

         $("#loadingModal").show();
         $scope.question.answerChoices = [];
         for (var i = 0; i < $scope.ansch.length; i++) {
             $scope.question.answerChoices.push($scope.ansch[i].text);
         }
         if ($scope.validation()) {
             $scope.question.mandatoryFlag = $scope.equestionDetails.mandatoryFlag;
             $scope.equestionDetails.data = angular.toJson($scope.question);
             var data = [parseInt($scope.projectId), $scope.equestionDetails.constituencyId, $scope.equestionDetails.name, $scope.equestionDetails.DisplayType, $scope.equestionDetails.data, $scope.equestionDetails.Activation, $scope.equestionDetails.mandatoryFlag];
             var reqObj = {
                 PRCID: "UPDATEPROFILEEQUSTION",
                 paramArray: data
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                 $("#loadingModal").hide();
                 swal("Sucess!", "ProfileQuestion update sucessfully !", "success");
                 window.location.href = "#Question/1";
             });
         }
         else {
             $("#loadingModal").hide();
             swal("error!", "Field Cannot be null", "error");
         }
     }
     $scope.cancel=function(){
         window.location.href = "#Question/1";
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