 var app = angular.module('rajneethi');

 app.controller('historyCtrl', function($scope, $routeParams, $http) {
     var projectId = $routeParams.id;
    

     function showPieChart(surveydata, divid, res) {
         var f = '';
         if (res.win_flag)
             f = res.win_flag

         //var id = 'container' + index;
         console.log(divid);
         Highcharts.chart(divid, {
             chart: {
                 plotBackgroundColor: null,
                 plotBorderWidth: null,
                 plotShadow: false,
                 type: 'pie'
             },
             title: {
                 text: res.electiontype + " " + res.electionyear + " ( " + f.replace('$', ' ') + " , " + res.booth_strength + " )"
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
      $scope.graphs = [];
    
     //$scope.grap = [1, 2, 3];
     $scope.getSurveyData = function (booth) {
       
         
         //$scope.graphs = [];
         var qurl = getAPIBaseURL() + "api/v1/shared?PRCID=ELECTIONHISTORIES&projectId=" + $routeParams.id;
         $http.get(qurl).success(function (res) {
             console.log(res);
             $("#graphscontainer").empty();
             for (var qidcnt = 0; qidcnt < res.length; qidcnt++) {
                 var historyReport = res[qidcnt];
                
                 var data = "";
                 if (historyReport.entity_name.toUpperCase() == booth.toUpperCase()) {
                     var divid = "graphid" + qidcnt;
                     $("#graphscontainer").append($('<div class="col-md-6" style="margin-bottom:100px;"><div id="' + divid + '"></div></div>'));
                     //$scope.graphs.push({ IDX: qidcnt, name: res[qidcnt].name, height: 0 });
                     data = gethistrygraph(res[qidcnt]);
                     // var data1 = [{ name: "BJP", y: 2 }, { name: "INC", y: 4 }];
                     showPieChart(data, divid, res[qidcnt]);
                 }
                     
                 
                // showPieChart(data, divid,"","");
             }
         }).error(function (err) {
             console.log(err)
             //$scope.DisplayToUI(res);
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
        $scope.getSurveyDataBenef('Default');
        $scope.getSurveyDataOpin('Default');
         
     }

     
     function showPieChartBenef(surveydata, divid) {
         //var id = 'container' + index;
         console.log(divid);
         Highcharts.chart(divid, {
             chart: {
                 plotBackgroundColor: null,
                 plotBorderWidth: null,
                 plotShadow: false,
                 type: 'pie'
             },
             title: {
                 // text: res.electiontype + " " + res.electionyear + " ( " + res.win_flag.replace('$', ' ') + " , " + res.booth_strength + " )"
                 text:"Benificery Details"
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
    // $scope.graphs = [];

     //$scope.grap = [1, 2, 3];
     $scope.getSurveyDataBenef = function (booth) {

         var reqObj = {
             PRCID: "GETBENEFICIAlBYTYPE",
             paramArray: [$routeParams.id]
         };

         executeApi(reqObj, function (data) {
             console.log(data);
            // var qurl = getAPIBaseURL() + "api/v1/shared?PRCID=ELECTIONHISTORIES&projectId=" + $scope.consId;
             //$http.get(qurl).success(function (res) {
                // console.log(res);
                 // $("#graphscontainer").empty();
                 // for (var qidcnt = 0; qidcnt < res.length; qidcnt++) {
                 // var historyReport = res[qidcnt];

                // var data = "";
                 //if (res.entity_name.toUpperCase() == booth.toUpperCase()) {
                 var divid = "graph";// + qidcnt;
                 $("#graphscontainer1").append($('<div class="col-md-6" style="margin-bottom:100px;"><div id="' + divid + '"></div></div>'));
                 //$scope.graphs.push({ IDX: qidcnt, name: res[qidcnt].name, height: 0 });
                 // data = gethistrygraph(res[qidcnt]);
                 var data1 = [{ name: "BJP", y: 2 }, { name: "INC", y: 4 }];
                 showPieChartBenef(data, divid);
                 //  }


                 // showPieChart(data, divid,"","");
                 // }
             //}).error(function (err) {
             //    console.log(err)
             //    //$scope.DisplayToUI(res);
             //});
             
         });
        
        
     }
     function showPieChartOpin(surveydata, divid) {
         //var id = 'container' + index;
         console.log(divid);
         Highcharts.chart(divid, {
             chart: {
                 plotBackgroundColor: null,
                 plotBorderWidth: null,
                 plotShadow: false,
                 type: 'pie'
             },
             title: {
                 //text: res.electiontype + " " + res.electionyear + " ( " + res.win_flag.replace('$', ' ') + " , " + res.booth_strength + " )"
                 text:"Opinion Poll"
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
     // $scope.graphs = [];

     //$scope.grap = [1, 2, 3];
     $scope.getSurveyDataOpin = function (booth) {
         var reqObj = {
             PRCID: "GETPARTYPREFERENCE",
             paramArray: [projectId]
         };

         executeApi(reqObj, function (data) {
             console.log(data);


             //var qurl = getAPIBaseURL() + "api/v1/shared?PRCID=ELECTIONHISTORIES&projectId=" + $scope.consId;
             //$http.get(qurl).success(function (res) {
             //    console.log(res);
             //$("#graphscontainer").empty();
             // for (var qidcnt = 0; qidcnt < res.length; qidcnt++) {
             // var historyReport = res[qidcnt];
             //var data = "";
             //if (res.entity_name.toUpperCase() == booth.toUpperCase()) {
             var divid = "graph1";// + qidcnt;
             $("#graphscontainer2").append($('<div class="col-md-6" style="margin-bottom:100px;"><div id="' + divid + '"></div></div>'));
             //$scope.graphs.push({ IDX: qidcnt, name: res[qidcnt].name, height: 0 });
             // data = gethistrygraph(res[qidcnt]);
             var data1 = [{ name: "BJP", y: 2 }, { name: "INC", y: 4 }, { name: "IND", y: 2 }];
             showPieChartOpin(data, divid);
             //  }


             // showPieChart(data, divid,"","");
             // }
             //}).error(function (err) {
             //    console.log(err)
             //    //$scope.DisplayToUI(res);
             //});
         });
     }
     $scope.consId = window.localStorage.getItem("constituencyId");
     $scope.init();
 });