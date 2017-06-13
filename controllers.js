var app = angular.module('rajneethi');

app.controller('formCtrl', function ($scope, $location, userService, $http) {

    angular.element(document).ready(function () {
        $("#filecontrol").change(function () {
            $scope.readURL(this);
        });
    });
    $scope.readURL = function (input) {
        $("#mobile_no").val("");
        if (input.files && input.files[0]) {
            var filename = (input.files[0].name).substr((input.files[0].name).lastIndexOf('.') + 1);
            if (filename != "csv") {
                alert("Please select only csv file");
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#mobile_no").val(e.target.result);
            }
            reader.readAsText(input.files[0]);
        }
    }
    $scope.length = 0;
    $scope.Messagelength = 0;
    $scope.charactercount = function (event) {
        var message = $("#message").val();
        var key = event.keyCode;
        $scope.length = parseInt(message.length / 160) + 1;
        $scope.Messagelength = message.length + 1;
        if (message.length == 0) {
            $scope.length = 0;
        }
        if (key == 8) {
            if (message.length <= 1) {
                $scope.length = 0;
                $scope.Messagelength = 0;

            } else {
                $scope.Messagelength = message.length - 1;
            }
        }
        
    }
    $scope.reload = function () {
        window.location.reload();
    }
    $scope.sendMessage = function () {
        $("#loadingModal").show();
        var message = $("#message").val();
        if (message.length <= 0) {
            alert("please enter message");
            $("#loadingModal").hide();
            return;
        }
        var number = $("#mobile_no").val();
        if (number.length <= 0) {
            alert("please select csv file");
            $("#loadingModal").hide();
            return;
        }
        var isInvalidNumberExist = false;
        var list = number.split(',');
        for (var numCounter = 0; numCounter < list.length; numCounter++) {
            var Boolead = isNaN(list[numCounter]);
            if (Boolead) {
                alert("Current file or data have alphanumeric numeric wich is not allowed");
                isInvalidNumberExist = true;
                break;
            }
            if (((list[numCounter].toString().length != 10) && (list[numCounter].toString().length != 11))) {
                isInvalidNumberExist = true;
                alert("Current file or data have wrong mobile number wich is not allowed");
                break;
            }
        }
        if (!isInvalidNumberExist) {
            var url = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/sendtextsms";
            //"http://localhost:6002/sendtextsms";

            var reqObj = {
                NUMBERS: number,
                TEXT: message
            };

            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                async: true,
                processData: false,
                cache: false,
                data: JSON.stringify(reqObj),
                error: function (err) {
                    console.log(err);
                    alert("Error in calling service");
                    $("#loadingModal").hide();
                },
                success: function (response) {
                    // swal("Sent Message", "User has been sent Message success fully.", "success");
                    alert("Message has been sent success fully.");
                    $("#loadingModal").hide();
                    window.location.reload();
                }
            });


            //$http({
            //    method: 'GET',
            //    url: "http://sms.cannyinfotech.com/sendsms.jsp?user=rajneethi&password=can@789&mobiles=" + number + "&sms=" + message + "&unicode=0&senderid=RJNETI&version=3"
            //}).success(function (data, status, headers, config) {
            //    console.log(data + "k" + status);
            //}).error(function (data, status, headers, config) {
            //    console.log(status);
            //});

            //$http.get("http://sms.cannyinfotech.com/sendsms.jsp?user=rajneethi&password=can@789&mobiles=" + number + "&sms=" + message + "&unicode=0&senderid=RJNETI&version=3").
            //then(function (response) {
            //    console.log(response);
            //});

        }
    }
});

app.controller('voicesmsCtrl', function ($scope, $location, userService, $http) {
    angular.element(document).ready(function () {
        $("#filecontrol").change(function () {
            $scope.readURL(this);
        });
    });
    $scope.readURL = function (input) {
        $("#mobile_no").val("");
        if (input.files && input.files[0]) {
            var filename = (input.files[0].name).substr((input.files[0].name).lastIndexOf('.') + 1);
            if (filename != "csv") {
                alert("Please select only csv file");
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#mobile_no").val(e.target.result);
            }
            reader.readAsText(input.files[0]);
        }
    }
    //$scope.OpenFileDialog = function () {
    //    $("#filecontrolaudio").click()
    //}
    $scope.reload = function () {
        window.location.reload();
    }
    function setUpAWS() {
        var albumBucketName = 'piggybookdata';
        var bucketRegion = 'Oregon';
        var IdentityPoolId = 'us-west-2:96768897-8f92-4b55-a9ff-9d757c7b8d4f'

        AWS.config.update({
            region: 'us-west-2',
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: IdentityPoolId
            })
        });

        return new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: albumBucketName }
        });
    }
    $scope.UploadMessage = function () {
        $("#loadingModal").show();
        if ($("#filecontrolaudio")[0].files[0]) {
            var file = $("#filecontrolaudio")[0].files[0];
            var filename = (file.name).substr((file.name).lastIndexOf('.') + 1);
        }
        if (filename != "mp3") {
            alert("Please select any audio mp3 file");
            $("#loadingModal").hide();
            return;
            
        }
        if (file.size > 5242880) {
            alert("Please select any mp3 file maximum 5MB");
            $("#loadingModal").hide();
            return;
           
        }
        var number = $("#mobile_no").val();
        if (number.length <= 0) {
            alert("please select csv file");
            $("#loadingModal").hide();
            return;
        }

        var isInvalidNumberExist = false;
        var list = number.split(',');
        for (var numCounter = 0; numCounter < list.length; numCounter++) {
            var Boolead = isNaN(list[numCounter]);
            if (Boolead) {
                alert("Current file or data have alphanumeric numeric wich is not allowed");
               isInvalidNumberExist = true;
                break;
            }
            if (((list[numCounter].toString().length != 10) && (list[numCounter].toString().length != 11))) {
                isInvalidNumberExist = true;
                alert("Current file or data have alphanumeric numeric wich is not allowed");
                break;
            }
        }

        var photoKey = 'voicemessage/' + new Date().getTime() + "/" + file.name;

        var AWSS3 = setUpAWS();

        AWSS3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function (err, data) {
            if (err) {
                return alert('There was an error uploading your mp3 file: ', err.message);
                $("#loadingModal").hide();
            }           

            var url = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/sendvoicesms";
           
          // var url = "http://localhost:80/sendvoicesms";


            var reqObj = {
                URL: data.Location,
                NUMBER: number// "9953813100,8860326476",
            };

            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                async: true,
                processData: false,
                cache: false,
                data: JSON.stringify(reqObj),
                error: function (err) {
                    alert("Error in calling service");
                    $("#loadingModal").hide();
                },
                success: function (response) {
                    alert("Message has been sent success fully.");
                    $("#loadingModal").hide();
                    window.location.reload();
                }
            });



        });

    }
});

app.controller('reportCtrl', function ($scope,$sce, $location, userService) {
    
    $scope.isreportdata = true;

    $scope.downlodeReport = function (input) {
        $("#loadingModal").show();

        var url = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/getbalance";
        //"http://52.39.36.115:6002/getbalance";

        //"http://localhost:6002/sendtextsms";

        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json; charset=utf-8',
            async: true,
            processData: false,
            cache: false,
            data: JSON.stringify({}),
            error: function (err) {
                console.log(err);
                alert("Error in calling service");
                $("#loadingModal").hide();
            },
            success: function (xml) {

                //var xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
                var xmlDoc = $.parseXML(xml);
                var $xml = $(xmlDoc);
                $scope.accountexpdate = $xml.find("accountexpdate").text();
                $scope.balanceexpdate = $xml.find("balanceexpdate").text();
                $scope.credit = $xml.find("credit").text();
                
                $scope.$apply();

                // swal("Sent Message", "User has been sent Message success fully.", "success");
                //alert("Message has been sent success fully.");
                $("#loadingModal").hide();
                //window.location.reload();
            }
        });
    }

    $scope.delreport = function (input) {


        $("#loadingModal").show();

        var url = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/getreport";

        
        //var url = "http://localhost:80/getreport";

        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            async: true,
            processData: false,
            cache: false,
            data: JSON.stringify({}),
            error: function (err) {
                console.log(err);
                alert("Error in calling service");
                $("#loadingModal").hide();
            },
            success: function (xml) {

                $scope.isreportdata = true;

                //var xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
                var xmlDoc = $.parseXML(xml);
                var $xml = $(xmlDoc);
                $scope.accountexpdate = $xml.find("accountexpdate").text();
                $scope.balanceexpdate = $xml.find("balanceexpdate").text();
                $scope.credit = $xml.find("credit").text();

                $scope.$apply();

                // swal("Sent Message", "User has been sent Message success fully.", "success");
                //alert("Message has been sent success fully.");
                $("#loadingModal").hide();
                //window.location.reload();
            }
        });
    }

    function KeyValueObject() {
        this.valuesToPost = [];
        this.Add = function (key, value) {
            this.valuesToPost.push({
                KEY: key,
                VALUE: value
            });
        }
    }

    function generateUniqueID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function getPostForm(data) {

        var url = "https://secure.payu.in/_payment/_payment";

        //Set a name for the form
        var formID = "PostForm";
        //Build the form using the specified data to be posted.
        var strForm = "";
        strForm = strForm + "<form id=\"" + formID + "\" name=\"" + formID + "\" action=\"" + url + "\" method=\"POST\">";



        for (var counter = 0; counter < data.valuesToPost.length ; counter++) {
            var key = data.valuesToPost[counter];
            strForm = strForm + "<input type=\"hidden\" name=\"" + key.KEY + "\" value=\"" + key.VALUE + "\">";
        }


        strForm = strForm + "</form>";
        //Build the JavaScript which will do the Posting operation.
        var strScript = "<script language='javascript'> var v" + formID + " = document." + formID + ";";
        strScript = strScript + "v" + formID + ".submit();";
        strScript = strScript + "</script>";
        //Return the form and the script concatenated.
        //(The order is important, Form then JavaScript)
        return strForm + strScript;


        //<form id="PostForm" name="PostForm" action="https://secure.payu.in/_payment/_payment"
        //method="POST">
        //<input type="hidden" name="lastname" value="Gupta">
        //<input type="hidden" name="address2" value="sector 41">
        //<input type="hidden" name="udf5" value="">
        //<input type="hidden" name="service_provider" value="payu_paisa">
        //<input type="hidden" name="curl" value="">
        //<input type="hidden" name="udf4" value="">
        //<input type="hidden" name="txnid" value="1466571e3194ec2388c5">
        //<input type="hidden" name="furl" value="http://www.rajneethi.com/">
        //<input type="hidden" name="state" value="Uttar Pradesh">
        //<input type="hidden" name="udf2" value="">
        //<input type="hidden" name="udf1" value="">
        //<input type="hidden" name="zipcode" value="">
        //<input type="hidden" name="amount" value="10">
        //<input type="hidden" name="email" value="vishal.kumar1145@gmail.com">
        //<input type="hidden" name="city" value="noida">
        //<input type="hidden" name="country" value="India">
        //<input type="hidden" name="udf3" value="">
        //<input type="hidden" name="address1" value="h 51">
        //<input type="hidden" name="hash" value="4628d84f4afa285396bfb2ba28609aea24812e3e30c8c2fb8859d071248bf6bcf3e3f6ea96bfb6ba5c56fe6844f02ce7c18855bc035318055301313ea4e0aee1">
        //<input type="hidden" name="key" value="aC71wk2k">
        //<input type="hidden" name="pg" value="">
        //<input type="hidden" name="surl" value="http://www.rajneethi.com/">
        //<input type="hidden" name="firstname" value="vishal">
        //<input type="hidden" name="productinfo" value="this is test product">
        //<input type="hidden" name="phone" value="9953813100">
        //</form>
        //<script language='javascript'>
        //    var vPostForm = document.PostForm; vPostForm.submit();
        //</script>
    }

    $scope.Buy2 = function () {
        debugger;
        
        var MERCHANT_KEY = "aC71wk2k";
        var SALT = "30tJtkKjQr";
        var surl = "http://www.rajneethi.com/";
        var furl = "http://www.rajneethi.com/";
        var seqs = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";

        var amount = 10;
        var phone = "9953813100";
        var firstname = "vishal";
        var lastname = "gupta";
        var address = "H-51 Sector 41 Noida";

        var hashVarsSeq = [];
        var txnid1 = generateUniqueID().substring(0,20); //";//strHash.ToString().Substring(0, 20);
        var hashVarsSeq = seqs.split("|");// ;

        
        var details = {
            productinfo: "Rajneethi SMS balance recharge", firstname: firstname, email: "sharaschandra@rajneethi.com",
            udf1: "", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: ""
        }

        var hash_string = "";

        for (var hashCounter in hashVarsSeq) {
            var hash_var = hashVarsSeq[hashCounter];
            if (hash_var == "key") {
                hash_string = hash_string + MERCHANT_KEY;
                hash_string = hash_string + '|';
            }
            else if (hash_var == "txnid") {
                hash_string = hash_string + txnid1;
                hash_string = hash_string + '|';
            }
            else if (hash_var == "amount") {
                hash_string = hash_string + amount
                hash_string = hash_string + '|';
            }
            else {

                hash_string = hash_string + details[hash_var] //(Request.Form[hash_var] != null ? Request.Form[hash_var] : "");// isset if else
                hash_string = hash_string + '|';
            }
        }

        hash_string = hash_string + SALT;

        console.log(hash_string);

        //generate hash here
        var hash1 = "15be6a8d3b69a459a7df000e0888809395f4df6928e5d01a669d8e4cc1218aab55704190c63667da2ad366f77aa70eb68b5820bfe1e840fa90accb6a0014c83f";

        var data = new KeyValueObject(); // adding values in gash table for data post
        data.Add("hash", hash1);
        data.Add("txnid", txnid1);
        data.Add("key", MERCHANT_KEY);
        //var AmountForm = Convert.ToDecimal(amount.Text.Trim()).ToString("g29");// eliminating trailing zeros
        //amount.Text = AmountForm;
        data.Add("amount", amount);
        data.Add("firstname", details.firstname);
        data.Add("email", details.email);
        data.Add("phone", phone);
        data.Add("productinfo", details.productinfo);
        data.Add("surl", details.surl);
        data.Add("furl", details.furl);
        data.Add("lastname", details.lastname);
        data.Add("curl", details.curl);
        data.Add("address1", address);
        data.Add("address2", "");
        data.Add("city", "");
        data.Add("state", "");
        data.Add("country", "");
        data.Add("zipcode", "");
        data.Add("udf1", details.udf1);
        data.Add("udf2", details.udf2);
        data.Add("udf3", details.udf3);
        data.Add("udf4", details.udf4);
        data.Add("udf5", details.udf5);
        data.Add("pg", details.pg);
        data.Add("service_provider", "payu_paisa");

        var form = getPostForm(data);
        

    }

    $scope.showBuyForm = function () {
        $scope.isreportdata = false;
    }

    $scope.reload = function () {
        window.location.reload();
    }


    $scope.Buy = function () {

        //var reqObj = {
        //    URL: data.Location,
        //    NUMBER: number// "9953813100,8860326476",

        var username = window.localStorage.getItem("USER") ;//, data.username);

        if (username) {

            var am = $("#amname").val();
            if (am == "") {
                alert("Pleae enter the amount");
                return;
            }

            var mo = $("#moname").val();
            if (mo == "") {
                alert("Pleae enter the mobile number");
                return;
            }

            var reqObj = {
                amount: $("#amname").val(), // 10,
                phone: $("#moname").val(),//"9953813100",
                firstname: username,//"vishal",
                lastname: username,//"gupta",
                address: username,//"H-51 Sector 41 Noida"
            };

            var query = "?AMT=" + reqObj.amount + "&MOB=" + reqObj.phone + "&NME=" + reqObj.firstname;
            
            var url = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/buysms";

            //url = "http://localhost/buysms"

            url = url + query;

            //url = "http://localhost/buysms123"

            console.log(url);

            $.ajax({
                type: 'GET',
                url: url,               
                error: function (err) {
                    console.log(err);
                    alert("Error in calling service");
                },
                success: function (response) {
                    $scope.htmldata = $sce.trustAsHtml(response);;
                    $("#form").val(response);
                    //window.open("data:text/html;charset=utf-8," + response, "", "_blank")

                    //var wnd = window.open("about:blank", "", "_blank");
                    //wnd.document.write(response);
                    //document.write(console.log(response));

                }
            });
        } else {
            alert("You must loged in before bying sms credit");
            $location.path('/login');
        }

    }
});

app.controller('transcationCtrl', function ($scope, $location, userService) {
    console.log("transcationCtrl");

   


    $scope.Confirm = function () {

        //var reqObj = {
        //    URL: data.Location,
        //    NUMBER: number// "9953813100,8860326476",

        var username = window.localStorage.getItem("USER");//, data.username);

        
            //var reqObj = {
            //    amount: $("#amname").val(), // 10,
            //    phone: $("#moname").val(),//"9953813100",
            //    firstname: username,//"vishal",
            //    lastname: username,//"gupta",
            //    address: username,//"H-51 Sector 41 Noida"
            //};


            var firstname = $location.search().name;
            var amount = $location.search().amount;

            var query = "?AMT=" + amount + "&NME=" + firstname;

            var url = "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/buysmsconfirm";

            //url = "http://localhost/buysmsconfirm"

            url = url + query;

            //url = "http://localhost/buysms123"

            console.log(url);

            $.ajax({
                type: 'GET',
                url: url,
                error: function (err) {
                    $location.path('/clientprofile');

                    //console.log(err);
                    //alert("Error in calling service");
                },
                success: function (response) {

                    $location.path('/clientprofile');


                    //$scope.htmldata = $sce.trustAsHtml(response);;
                    //$("#form").val(response);
                    //window.open("data:text/html;charset=utf-8," + response, "", "_blank")

                    //var wnd = window.open("about:blank", "", "_blank");
                    //wnd.document.write(response);
                    //document.write(console.log(response));

                }
            });
        

    }

    $scope.Confirm();

    //setTimeout(function () {
    //    $location.path('/clientprofile');
    //}, 5000);

});


