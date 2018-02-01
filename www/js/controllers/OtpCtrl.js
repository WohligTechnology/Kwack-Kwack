connector.controller('OtpCtrl', function ($scope, $stateParams, $state, Chats, ionicToast) {

    $scope.resendOtp = function () {
        $scope.data = {}
        $scope.data.mobile = $.jStorage.get("user").mobile
        Chats.apiCallWithData("User/sendOtp", $scope.data, function (info) {
            console.log("otp", info)
            if (info.value == true) {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);

            }
        })

    }
    $scope.otp = function (info) {
        if (info.digit1 && info.digit1 && info.digit3 && info.digit4) {
            console.log("inside if")
            $scope.data = {}
            $scope.data.otp = info.digit1 + info.digit2 + info.digit3 + info.digit4
            console.log(" $scope.data", $scope.data)
            Chats.apiCallWithData("User/verifyOTPForResetPass", $scope.data, function (data) {
                console.log("data is after verifyOTPForResetPass called", data);
                if (data.value == true) {
                    $state.go("success")

                } else {
                    console.log("Incorrect OTP!");
                    $state.go("error")
                }
            });
        } else {
            console.log("enter all the field")
            ionicToast.show('Please Enter OTP', 'top', false, 2500);
        }

    }




})