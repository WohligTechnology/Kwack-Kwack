connector.controller('ErrorCtrl', function($scope, $state) {
    $scope.resendOtp = function () {
        $scope.data = {}
        $scope.data.email = $.jStorage.get("user").email
        Chats.apiCallWithData("User/sendOtp", $scope.data, function (otp) {
            if (info.value == true) {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);
                $state.go("otp")
            }
        })

    }
})