connector.controller('ErrorCtrl', function($scope, $state, Chats, ionicToast) {
    $scope.resendOtp = function () {
        $scope.data = {}
        $scope.data.mobile = $.jStorage.get("user").mobile
        $scope.data.userId= $.jStorage.get("user")._id
        Chats.apiCallWithData("User/sendOtp", $scope.data, function (otp) {
            console.log("otp", otp)
            if (otp.value == true) {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);
                $state.go("otp")
            }
        })

    }
})