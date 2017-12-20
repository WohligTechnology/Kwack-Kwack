connector.controller('SignUpCtrl', function ($scope, Chats, $state) {
        console.log("inside sign up")
    $scope.saveUser = function (info) {
      if (info.password == info.forgotPassword) {
        Chats.apiCallWithData("User/save", info, function (data) {
          console.log("data is", data)
          if (data.value == true) {
            $scope.data = data;

            $state.go("otp",{
              userId:data.data._id
            })
          }else{
              console.log("invalid email")
          }
        })
      } else {
        console.log("inside else")
      }
    }
})