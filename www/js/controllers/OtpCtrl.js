connector.controller('OtpCtrl', function ($scope, $stateParams, $state, Chats, ionicToast, $window) {
    $scope.formName = {}
    $scope.resendOtp = function () {
        $scope.data = {}
        if ($.jStorage.get("user")) {
            $scope.data.mobile = $.jStorage.get("user").mobile
        } else {
            $scope.data.mobile = $.jStorage.get("mobile").mobile
        }

        Chats.apiCallWithData("User/sendOtp", $scope.data, function (info) {
            if (info.value == true) {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);
            }
        })
    }
    $scope.otp = function (info) {
        if (info.digit1 >= 0 && info.digit2 >= 0 && info.digit3 >= 0 && info.digit4 >= 0) {
            $scope.data = {}
            // if ($.jStorage.get("user")) {
            //     $scope.data._id = $.jStorage.get("user")._id
            // }

            $scope.data.otp = info.digit1.toString() + info.digit2.toString() + info.digit3.toString() + info.digit4.toString();
            Chats.apiCallWithData("User/verifyOTPForResetPass", $scope.data, function (data) {
                if (data.value == true) {
                    $scope.userData = data.data
                    $scope.userData.verified = true;
                    $.jStorage.set("user", $scope.userData);
                    $state.go("success")
                } else {
                    $state.go("error")
                }
            });
        } else {
            ionicToast.show('enter all the field', 'top', false, 2500);
        }
    }

    $scope.checkChange = function (value) {
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
                    if (element)
                        element.focus();
                }
                break;
            default:
                console.log("invalid choice");
        }
    }
})