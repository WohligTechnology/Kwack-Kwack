connector.controller('SuccessCtrl', function ($scope, $state,Chats) {
    $scope.success = $.jStorage.get("mobile")
    // $scope.dataToSend = {}
    // $scope.dataToSend.mobile = $.jStorage.get("user").mobile,
        $scope.smsMessage = "Thank You for Signing Up!"
                $scope.smsObj = {
                    "message": "kwack",
                    "sender": "Kwackk",
                    "sms": [{
                        "to": $.jStorage.get("user").mobile,
                        "message":  $scope.smsMessage,
                        "sender": "Kwackk"
                    }]
                };
    $scope.nextstate = function () {
        if ($scope.success != null) {
            $state.go("confirmpass")
        } else {
            $state.go("location")
            Chats.apiCallWithData("Config/sendSMS",  $scope.smsObj, function (data) {
                if (data.value == true) {}
            })
        }
    }
})