connector.controller('OtpCtrl', function ($scope, $stateParams, $state, Chats,ionicToast) {


    $scope.resendOtp = function (info) {
        $scope.data = {}
        $scope.data.email = $.jStorage.get("user").email
        Chats.apiCallWithData("User/sendOtp", $scope.data, function (info) {
            if (info.value == true) {
                ionicToast.show('otp sent successfully', 'top', true, 2500);

            }
        })

    }
})