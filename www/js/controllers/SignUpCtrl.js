connector.controller('SignUpCtrl', function ($scope, Chats, $state, ionicToast) {
    // console.log("inside sign up")
    $scope.showMassage = false
     $scope.setEmailMsg = false
    $scope.saveUser = function (info) {
        // console.log("inside save user function", info)
        if (info.password == info.forgotPassword) {
            // console.log("inside if", info)
            if($.jStorage.get('user')){
             info._id=$.jStorage.get('user')._id   
            }
            Chats.apiCallWithData("User/saveUser", info, function (data) {
                console.log("data is************after api called", data)
                if (data.value == true) {
                    $scope.userData = data.data;
                    $scope.userData.verified=false;
                    $.jStorage.set("user",  $scope.userData);
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
            // console.log("inside else")
            $scope.showMassage = true
            // console.log("inside else")
        }
    }
    $scope.demo = function(){
        console.log('Inside demo condition')
        $scope.setEmailMsg = false
      };
       $scope.demo1 = function(){
        console.log('Inside demo condition')
        $scope.setMobileMsg = false
      };
})