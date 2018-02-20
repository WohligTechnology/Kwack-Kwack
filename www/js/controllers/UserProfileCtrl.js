connector.controller('UserProfileCtrl', function($scope,Chats, $cordovaImagePicker, $ionicActionSheet) {
   
    $scope.userDataFollow = {}
    $scope.userDataFollow.userId = $.jStorage.get("user")._id;
    $scope.userData = {}
    $scope.userData._id = $.jStorage.get("user")._id;
   Chats.apiCallWithData("User/getOne", $scope.userData, function (data) {
        console.log("*************",data)
        if (data.value == true) {
            $scope.userInfo = data.data;
        } else {}
    });
    
// all fllowers kwack polls
Chats.apiCallWithData("UserFollow/getAllFollowerName", $scope.userDataFollow, function (data) {
   if (data.value == true) {
        $scope.setFollowCountValueZero = data.data.length
    } else {
        $scope.setFollowCountValueZero = "0"
    }
})


Chats.apiCallWithData("Comment/getKwackForOneUser", $scope.userDataFollow, function (data) {
    if (data.value == true) {
        $scope.setKwackCountValueZero = data.data.length
    } else {
        $scope.setKwackCountValueZero = "0"
    }
})

Chats.apiCallWithData("PollAnswer/getPollForOneUser", $scope.userDataFollow, function (data) {
    if (data.value == true) {
        $scope.setPollCountValueZero = data.data.length
    } else {
        $scope.setPollCountValueZero = "0"
    }
})



  
})