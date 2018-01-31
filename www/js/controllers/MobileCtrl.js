connector.controller('MobileCtrl', function ($scope,Chats,ionicToast, $state) {
    $scope.verifyMobile = function (data) {
        console.log("********************", data)
           $scope.data = {}
        $scope.data.mobile = data.mobile
        Chats.apiCallWithData("User/sendOtp", $scope.data, function (info) {
            console.log("otp",info)
            if (info.value == true) {
                ionicToast.show('Otp Sent Successfully', 'top', false, 2500);
                 $state.go("otp")

            }else{
                ionicToast.show('Enter valid number', 'top', false, 2500);
            }
        })

    }
})