connector.controller('InviteFriendsCtrl', function (Chats, $scope) {
  $scope.user = {}
  $scope.user.userId = $.jStorage.get('user')._id
  $scope.toggle = true
  $scope.people = function () {
    $scope.toggle = true
  }
  $scope.contact = function () {
    $scope.toggle = false
  }
  $scope.followersb = true;
  $scope.followers = function () {
    $scope.followersb = true;
    $scope.kwacksb = false;
    $scope.pollsb = false;
  }
  $scope.kwacks = function () {
    $scope.followersb = false;
    $scope.kwacksb = true;
    $scope.pollsb = false;
  }
  $scope.polls = function () {
    $scope.followersb = false;
    $scope.pollsb = true;
    $scope.kwacksb = false;
  }

  Chats.apiCallWithData("User/getAllUser", $scope.user, function (data) {
    // console.log("Users", data.data)
    $scope.people = data.data
  })

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
  $scope.unfollow = function (id) {
    $scope.user = {}
    $scope.user.userFollowed = $.jStorage.get('user')._id
    $scope.user.userFollwing = id
    Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.user, function (data) {
      console.log("Users", data)
    })
  }

  $scope.follow1 = function (id) {
    console.log("hello", id)
    $scope.user = {}
    $scope.user.userFollowed = $.jStorage.get('user')._id
    $scope.user.userFollwing = id
    Chats.apiCallWithData("UserFollow/removeFollowerCount", $scope.user, function (data) {
      console.log("Users", data)
    })
  }
  $scope.countValue = false
   $scope.setFollowCountValueZero=false
  $scope.selectedUser = function (data) {
    console.log("**************", data)
    $scope.countValue = true
    $scope.userData = {}
    $scope.userData.userId = data
    $scope.user = {}
    $scope.user._id = data
    Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.userData, function (data) {
      console.log("111111111111111111111111111111111111", data)
      if (data.value == true) {
        $scope.count = data.data
        console.log(" $scope.userData $scope.userData $scope.userData", $scope.count)
      } else {
       $scope.setFollowCountValueZero=true
      }

    })
    Chats.apiCallWithData("Comment/getKwackForOneUser", $scope.userData, function (data) {
      console.log("222222222222222222222222222222222222222", data)
      if (data.value == true) {
        $scope.totalKwacks = data.data
        console.log(" $scope.userData $scope.userData $scope.userData", $scope.totalKwacks)
      } else {
        $scope.totalKwacks = {}
        $scope.totalKwacks.length = 0
      }
    })
    Chats.apiCallWithData("PollAnswer/getPollForOneUser", $scope.userData, function (data) {
      console.log("333333333333333333333333333333333", data)
      if (data.value == true) {
        $scope.totalPolls = data.data
        console.log(" $scope.userData $scope.userData $scope.userData", $scope.totalPolls)
      } else {
        $scope.totalPolls = {}
        $scope.totalPolls.length = 0
      }
    })

    Chats.apiCallWithData("User/getOne", $scope.user, function (data) {
      if (data.value == true) {

        $scope.userInfo = data.data
        console.log("*********v$scope.userInfo", $scope.userInfo)
      } else {

      }
    })
  }
   $scope.backTOlist = function () {
      $scope.countValue = false
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  };
})