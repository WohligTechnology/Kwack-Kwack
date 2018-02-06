connector.controller('MobileCtrl', function ($scope,Chats,ionicToast, $state) {
  $scope.data = {}
        $scope.data.mobile = parseInt($.jStorage.get("user").mobile);
         $scope.data.userId= $.jStorage.get("user")._id

    $scope.verifyMobile = function (data) {
        console.log("********************", data)
         
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