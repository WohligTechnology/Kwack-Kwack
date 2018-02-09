connector.controller('ForgotPassCtrl', function($scope, Chats, ionicToast, $state) {
    // $scope.forgot = {}
    $scope.resendOtp = function (forgot) {
        console.log("hello[pass", forgot)
        $scope.mobile={
            mobile: forgot.mobile
        }

        $.jStorage.set("mobile", $scope.mobile);
        Chats.apiCallWithData("User/sendOtp", forgot, function (otp) {
            console.log("otp", otp)
            if (otp.value == true) {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);
                $state.go("otp")
            }
        })

    }
})