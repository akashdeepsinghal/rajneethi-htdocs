var app = angular.module('rajneethi');

 app.controller('surveyCtrl', function($scope, $routeParams, $http) {
     var projectId = $routeParams.id;
    
     function chunk(arr, chunkSize) {
         var R = [];
         for (var i = 0, len = arr.length; i < len; i += chunkSize)
             R.push(arr.slice(i, i + chunkSize));
         return R;
     }

     function oddOrEven(x) {
         return (x & 1) ? true : false;
     }

     function getPairObject(record) {
    
         var surveyDetails= [];
         var id = 0;
         for (var prop in record) {
                     surveyDetails.push({
                         name: prop,
                         y: parseInt(record[prop])
                     });
         }
         return surveyDetails;
     }


     function showPieChart(surveydata, index) {
         var id = 'container' + index;
         Highcharts.chart(id, {
             chart: {
                 plotBackgroundColor: null,
                 plotBorderWidth: null,
                 plotShadow: false,
                 type: 'pie'
             },
             title: {
                 text: 'Survery Result'
             },
             credits: {
                 enabled: false
             },
             tooltip: {
                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
             },
             plotOptions: {
                 pie: {
                     allowPointSelect: true,
                     cursor: 'pointer',
                     dataLabels: {
                         enabled: true,
                         format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                         style: {
                             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                         }
                     }
                 }
             },
             series: [{
                 name: 'Vote Percentage',
                 colorByPoint: true,
                 data: surveydata
             }]
         });
     }
    
    

     $scope.DisplayToUI = function (res, name, indexVal, DisplayType) {
         console.log("getting DisplayToUI index value " + indexVal);
         var surveyObject = [];
         if (DisplayType == "PIE") {
             for (i = 0; i < res.length; i++) {
                 if (res[i]) {
                     var even = _.find(surveyObject, function (num) { return num.name == res[i].SurveyValue; });
                     if (even == undefined) {
                         var obj = {
                             name: res[i].SurveyValue,
                             y: 1
                         }
                         surveyObject.push(obj);
                     }
                     else {
                         var index = _.findLastIndex(surveyObject, {
                             name: res[i].SurveyValue
                         });
                         surveyObject[index].y = even.y + 1;
                     }
                 }
             }
             if (surveyObject.length > 0) {
                 var data = surveyObject;
                 data[0].sliced = true;
                 data[0].selected = true;
                 showPieChart(data, indexVal);
             }
             else
                 showPieChart([], indexVal);
         }
         else {
             for (var qidcnt = 0; qidcnt < $scope.graphs.length; qidcnt++) {
                 if (qidcnt == indexVal) {
                     $scope.graphs[indexVal].gridOptions = {
                         enableSorting: true,
                         columnDefs: [
                           { field: 'SurveyValue', displayName: name, headerCellClass: 'blue' },

                         ]
                     };
                     $scope.graphs[indexVal].gridOptions.data = res;
                 }
             }

         }
     }

     $scope.getGraphData = function (booth, name, index, DisplayType) {

         //var name = "politicalPreference";
         var qurl = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/api/v1/shared?PRCID=SURVEYDETAILS&Question=" + name + "&ProID=" + $routeParams.id;//res[qidcnt].name;
         console.log("survery data url :- " + qurl);
         $http.get(qurl).success(function (res) {
             console.log("getting index value " + index);
             if (res.length > -1) {
                 if (booth == 'Default') {
                     var heading = 'Constituency';
                     $scope.DisplayToUI(res, name,index, DisplayType);
                 } else {
                     var heading = booth;
                     //_.find()
                     res= _.filter(res, function (num) { return num.BoothId == booth });
                     $scope.DisplayToUI(res,name, index, DisplayType);
                 }
                 //$scope.DisplayToUI(res, name, index, DisplayType);
                 $scope.graphs[index].height = 400;
             } else
                 $scope.graphs[index].height = 0;
         }).error(function (err) {
             console.log(err)
         });
     }
     $scope.graphs = [];
     $scope.getSurveyData = function (booth) {
         debugger;
         $scope.graphs = [];
         var qurl = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/api/v1/shared?PRCID=GETQUESTION&constituencyId=" + $scope.consId;
         $http.get(qurl).success(function (res) {
             for (var qidcnt = 0; qidcnt < res.length; qidcnt++) {
                 console.log("passing index value " + qidcnt);
                 $scope.graphs.push({ IDX: qidcnt, name: res[qidcnt].name, height: 0, gridOptions: [] });
                 $scope.getGraphData(booth, res[qidcnt].name, qidcnt, res[qidcnt].DisplayType);
             }
         }).error(function (err) {
             console.log(err)
             $scope.DisplayToUI(res);
         });
     }

     $scope.init = function () {


         $http.get('http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/api/v1/constituencymap/' + projectId).success(function (res) {
             $scope.constituencymap = res;
             $scope.booths = [];
             $scope.constituencymap.forEach(function (item) {
                 $scope.selectedBooth = "Default";
                 $scope.booths.push(item.booth_panchayat_name);
                 //$scope.showchart('Booth1');
             });
         }).error(function (err) {
             console.log(err)
         });
         $scope.getSurveyData('Default');
         
     }

     // $scope.consId = 10;
     $scope.consId= window.localStorage.getItem("constituencyId");
     $scope.init();

 });