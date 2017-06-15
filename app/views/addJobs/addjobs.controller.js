var app = angular.module('rajneethi');

app.controller('addjobsCtrl', function ($scope, $routeParams, $http) {
    projectId = $routeParams.id;
    $scope.flag = projectId;


    $scope.isEdit = false;
    if (projectId != "-1") {
        var reqObj = {
            PRCID: "GETBENEFICIARYDETAILS",
            paramArray: [projectId]
        };

        $scope.isEdit = true;
        executeApi(reqObj, function (data) {
            $("#projectid").val(data[0].projectID);
            $("#type").val(data[0].Type);
           // $("#type").val(data[0].Type);
            $("#title").val(data[0].Title);
            $("#name").val(data[0].Name);
            $("#voterid").val(data[0].VoterID);
            $("#date").val(data[0].Date);
        });
    }

    $scope.Removebeneficiary = function () {
        swal({
            title: "Are you sure?",
            text: "You Want to delete benificery!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function () {
            var projectid = $scope.flag;
            var reqObj = {
                PRCID: "DELETEBENEFICIARYDETAILS",
                paramArray: [parseInt(projectid)]
            };

            executeApi(reqObj, function (data) {
                swal("Deleted!", "Your Beneficiary Deleted sucessfully !", "success");
                console.log(data);
                //window.location.reload();
                //$scope.gridOptions.data = data;
                //$scope.$apply();
                window.location.href = "#beneficiary/1";
            });


            
        });

    }




    $scope.addbeneficiary = function () {

    console.log($scope.datetoadd);

        if (projectId == "-1") {
            var projectid = $("#projectid").val();
            var type = $("#type").val();
            var title = $("#title").val();
            var name = $("#name").val();
            var voterid = $("#voterid").val();
            var date = $("#date").val();
            if (projectid == "" || type == "" || name == "" || title == "" || voterid == "" || date == "") {
                alert("please fill all field");
                return;
            }
           //  $("#loadingModal").show();
            add = [projectid, type, title, name, voterid, $scope.datetoadd]
            var reqObj = {
                PRCID: "CREATEBENEFICIARY",
                paramArray: add
            };

            executeApi(reqObj, function (data) {
                console.log(data);
                 $("#projectid").val("");
                 $("#type").val("");
                 $("#title").val("");
                 $("#name").val("");
                 $("#voterid").val("");
                 $("#date").val("");
                //  $("#loadingModal").hide();
                 swal("Saved!", "Your beneficiary saved sucessfully !", "success");
                 window.location.href = "#beneficiary/1";

            });
             
        }
    }
    $scope.reload = function () {
        $("#projectid").val("");
        $("#type").val("");
        $("#title").val("");
        $("#name").val("");
        $("#voterid").val("");
        $("#date").val("");
    }
    $scope.Editbeneficiary = function () {
        var projectid = $("#projectid").val();
        var type = $("#type").val();
        var title = $("#title").val();
        var name = $("#name").val();
        var voterid = $("#voterid").val();
        var date = $("#date").val();
        //if (projectid == "" || type == "" || name == "" || title == "" || voterid == "" || date == "") {
        //    alert("please fill all field");
        //    return;
        //}
        // $("#loadingModal").show();
        add = [parseInt(projectId), projectid, title, type, name, voterid, date]
        var reqObj = {
            PRCID: "UPDATEBENEFICIARYDETAILS",
            paramArray: add
        };

        executeApi(reqObj, function (data) {
            console.log(data);
            $("#projectid").val("");
            $("#type").val("");
            $("#title").val("");
            $("#name").val("");
            $("#voterid").val("");
            $("#date").val("");
          //   $("#loadingModal").hide();
            swal("Saved!", "Your beneficiary saved sucessfully !", "success");
            window.location.href = "#beneficiary/1";
        });
    }

    $scope.type = ['DWP (DESTITUTE WIDOW PENSION) Pension', 'SSY (SANDHYA SURAKSHA YOJANE) Pension', 'PHP (PHYSICALLY HANDICAP PENSION) Pension',
'OAP(OLD AGE PENSION) Pension','Senior Citizen Card','Health Camp','Mayor Relief Fund','Vajapaye Arogyashree','Widow Relif Fund',
'School Fees','Ambedkar Loans','Devaraja Arasu Loans','Auto Drivers Helping Loans','House Given','Site Given','Ration Card',
'BPL Card','APL Card','Finance Assistance','Gym Benefits','Bhagyalakshmi Scheme','Auto Drivers Uniform','Pulling Cart',
'Bicycle','Motor Bike','TATA Ace Vehicle','Dobhi Kit','Iron Box Kit','Barber Kit','Beautician Course','Voter ID Application',
'AADHAR Application','School/College Admission Letter','Temple Darshan/Stay Letter','Transfer Letter','Residential Proof Letter',
    'Work Estimate Letter','Job Letter', 'Hospital Letter', 'Auto Loan','Hearing Aid/Tricycle/Motor Cycle', 'Car Loan','Others'];


    $scope.init =function(){
        console.log("in init");
          angular.element(document).ready(function () {
               // $('#datetimepicker1').datetimepicker();
    });
    }
     
      $scope.init();
    
 });
