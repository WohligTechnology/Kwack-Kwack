connector.controller('SignUpCtrl', function ($scope, Chats, $state, ionicToast) {
    $scope.showMassage = false
    $scope.setEmailMsg = false
    $scope.saveUser = function (info) {
        if (info.password == info.forgotPassword) {
            if ($.jStorage.get('user')) {
                info._id = $.jStorage.get('user')._id
            }
            Chats.apiCallWithData("User/saveUser", info, function (data) {
                if (data.value == true) {
                    $scope.userData = data.data;
                    $scope.userData.verified = false;
                    $.jStorage.set("user", $scope.userData);
                    $state.go("mobile")
                } else {
                    if (data.error == "emailExist") {
                        $scope.setEmailMsg = true
                    }
                    if (data.error == "mobileExist") {
                        $scope.setMobileMsg = true
                    }
                }
            })
        } else {
            $scope.showMassage = true
        }
    }
    $scope.demo = function () {
        $scope.setEmailMsg = false
    };
    $scope.demo1 = function () {
        $scope.setMobileMsg = false
    };
})