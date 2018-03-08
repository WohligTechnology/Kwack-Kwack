connector.controller('SuccessCtrl', function ($scope, $state,Chats) {
    $scope.success = $.jStorage.get("mobile")
    $scope.dataToSend = {}
    $scope.dataToSend.mobile = $.jStorage.get("user").mobile
    $scope.nextstate = function () {
        if ($scope.success != null) {
            $state.go("confirmpass")
        } else {
            $state.go("location")
            Chats.apiCallWithData("User/sendWelcomeMsg", $scope.dataToSend, function (data) {
                if (data.value == true) {}
            })
        }
    }
})