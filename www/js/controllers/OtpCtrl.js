connector.controller('OtpCtrl', function ($scope, $stateParams, $state, Chats, ionicToast,$window) {
    $scope.formName = {}

    $scope.resendOtp = function () {
        $scope.data = {}
        if ($.jStorage.get("user")) {
            $scope.data.mobile = $.jStorage.get("user").mobile
        }else{
              $scope.data.mobile = $.jStorage.get("mobile").mobile
        }

        Chats.apiCallWithData("User/sendOtp", $scope.data, function (info) {
            console.log("otp", info)
            if (info.value == true) {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);

            }
        })

    }
    $scope.otp = function (info) {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%5%%", info)
        if (info.digit1 >= 0 && info.digit2 >= 0 && info.digit3 >= 0 && info.digit4 >= 0) {
            console.log("inside if")
            $scope.data = {}
            $scope.data.otp = info.digit1.toString() + info.digit2.toString() + info.digit3.toString() + info.digit4.toString();
            console.log(" $scope.data", $scope.data)
            Chats.apiCallWithData("User/verifyOTPForResetPass", $scope.data, function (data) {
                console.log("data is after verifyOTPForResetPass called", data);
                if (data.value == true) {
                     $scope.userData = data.data
                    $scope.userData.verified = true;
                    $.jStorage.set("user",$scope.userData);
                    $state.go("success")

                } else {
                    console.log("Incorrect OTP!");
                    $state.go("error")
                }
            });
        } else {
            console.log("inside else")
            ionicToast.show('enter all the field', 'top', false, 2500);
        }

    }

    $scope.checkChange = function (value) {
        console.log("value",value);
        switch (value) {
            case 4:
                if ($scope.formName.digit4 == "") {
                    var element = $window.document.getElementById('part3');
                    if (element)
                        element.focus();
                }
                break;

            case 3:
                if ($scope.formName.digit3 == "") {
                    var element = $window.document.getElementById('part2');
                    if (element)
                        element.focus();
                }
                break;

            case 2:
                if ($scope.formName.digit2 == "") {
                    var element = $window.document.getElementById('part1');
                    if (element)
                        element.focus();
                }
                break;

            case 1:
                if ($scope.formName.digit1 == "") {
                    var element = $window.document.getElementById('part1');
                    console.log("element",element)
                    if (element)
                        element.focus();
                }
                break;

            default:
                console.log("invalid choice");
        }

    }


})