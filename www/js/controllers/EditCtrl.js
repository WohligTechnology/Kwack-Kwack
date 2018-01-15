connector.controller('EditCtrl', function ($scope, Chats, $state) {

    $scope.userData = {}
    $scope.userData._id = $.jStorage.get("user")._id
    Chats.apiCallWithData("User/getOne", $scope.userData, function (data) {
        if (data.value == true) {
            $scope.userInfo = data.data

        } else {

        }
    })
    $scope.datasave = function (data) {
        console.log("**********", data)

        Chats.apiCallWithData("User/save", data, function (data) {
         if(data.value==true){
             $state.go("settings")
         }
        })
    }

})