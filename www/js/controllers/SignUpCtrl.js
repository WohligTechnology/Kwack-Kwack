connector.controller('SignUpCtrl', function ($scope, Chats, $state) {
    console.log("inside sign up")
    $scope.showMassage = false
    $scope.saveUser = function (info) {
        console.log("inside save user function", info)
        if (info.password == info.forgotPassword) {
            console.log("inside if")
            Chats.apiCallWithData("User/save", info, function (data) {
                console.log("data is", data)
                if (data.value == true) {
                    $scope.data = data;
                    $.jStorage.set("user", $scope.data.data);
                    $state.go("otp")
                } else {
                    console.log("invalid email")
                    // ionicToast.show('This is a toast at the top.', 'top', true, 2500);
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