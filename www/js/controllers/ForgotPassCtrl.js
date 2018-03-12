connector.controller('ForgotPassCtrl', function ($scope, Chats, ionicToast, $state) {
    $scope.resendOtp = function (forgot) {
        $scope.mobile = {
            mobile: forgot.mobile
        }
        $.jStorage.set("mobile", $scope.mobile);
        Chats.apiCallWithData("User/sendOtp", forgot, function (info) {
            if (info.data == "sms-sent") {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);
                $state.go("otp")
            } else if (info.data == "INV-NUMBER") {
                ionicToast.show('Not valid Number', 'top', false, 2500);
            } else if (data.value == false) {
                ionicToast.show('Please enter correct Mobile Number', 'top', false, 2500);
            }
        })
    }
})