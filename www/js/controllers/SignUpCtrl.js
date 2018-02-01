connector.controller('SignUpCtrl', function ($scope, Chats, $state, ionicToast) {
    console.log("inside sign up")
    $scope.showMassage = false
     $scope.setEmailMsg = false
    $scope.saveUser = function (info) {
        console.log("inside save user function", info)
        if (info.password == info.forgotPassword) {
            console.log("inside if", info)
            Chats.apiCallWithData("User/saveUser", info, function (data) {
                console.log("data is", data)
                if (data.value == true) {
                    $scope.data = data;
                    $.jStorage.set("user", $scope.data.data);
                    $state.go("mobile")
                } else {
                    if (data.error == "emailExist") {
                        $scope.setEmailMsg = true
                    } 
                }
            })
        } else {
            console.log("inside else")
            $scope.showMassage = true
            console.log("inside else")
        }
    }
    // $scope.hideToast = function(){
    //     ionicToast.hide();
    //   };
})