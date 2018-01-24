connector.controller('InviteFriendsCtrl', function (Chats, $scope, $state) {
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
    if (data.value == true) {
      $scope.people1 = data.data
      $scope.LoginUserId = {}
      $scope.LoginUserId.userId = $.jStorage.get("user")._id
      Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.LoginUserId, function (data) {
        if (data.value == true) {
          $scope.followingData = data.data
          _.forEach($scope.people1, function (peopleData) {
            _.forEach($scope.followingData, function (followingUserData) {
              if (peopleData._id == followingUserData.userBeenFollowed._id) {
                peopleData.showUnfollowbutton = true
              }


            });

          });
          console.log("*******************************", $scope.people1)
        } else {

        }

      })
    } else {

    }

  })

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
  $scope.follow = function (id) {
    $scope.follow = true
    $scope.user = {}
    $scope.user.userFollowed = $.jStorage.get('user')._id
    $scope.user.userFollwing = id
    Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.user, function (data) {
      console.log("Users", data)
      // $state.reload()
    })
  }

  $scope.unfollow = function (id) {
    $scope.follow = false;
    console.log("hello", id)
    $scope.user = {}
    $scope.user.userFollowed = $.jStorage.get('user')._id
    $scope.user.userFollwing = id
    Chats.apiCallWithData("UserFollow/removeFollowerCount", $scope.user, function (data) {
      console.log("Users", data)
      // $state.reload()
    })
  }
  $scope.countValue = false
  $scope.setFollowCountValueZero = false


  $scope.selectedUser = function (data) {
    $scope.countValue = true
    $scope.userData = {}
    $scope.userData.userId = data
    $scope.user = {}
    $scope.user._id = data
    Chats.apiCallWithData("UserFollow/getAllFollowerName", $scope.userData, function (data) {
      if (data.value == true) {
        $scope.count = {}
        $scope.count = data.data
        $scope.LoginUserId = {}
        $scope.LoginUserId.userId = $.jStorage.get("user")._id
        Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.LoginUserId, function (data) {
          if (data.value == true) {
            $scope.followingData = data.data
            _.forEach($scope.count, function (peopleData) {
              _.forEach($scope.followingData, function (followingUserData) {
                if (peopleData.user._id == followingUserData.userBeenFollowed._id) {
                  peopleData.showUnfollowbutton = true
                }if(peopleData.user._id== $.jStorage.get("user")._id){
                  peopleData.user.showButton=true
                }
              });

            });
            console.log(" $scope.count  $scope.count  $scope.count  $scope.count  $scope.count  $scope.count ", $scope.count)
          } else {

          }

        })
      } else {
        $scope.setFollowCountValueZero = true
      }

    })

    Chats.apiCallWithData("Comment/getKwackForOneUser", $scope.userData, function (data) {
      if (data.value == true) {
        $scope.totalKwacks = data.data
      } else {
        $scope.totalKwacks = {}
        $scope.totalKwacks.length = 0
      }
    })
    Chats.apiCallWithData("PollAnswer/getPollForOneUser", $scope.userData, function (data) {
      if (data.value == true) {
        $scope.totalPolls = data.data
      } else {
        $scope.totalPolls = {}
        $scope.totalPolls.length = 0
      }
    })

    Chats.apiCallWithData("User/getOne", $scope.user, function (data) {
      if (data.value == true) {

        $scope.userInfo = data.data
        if ($scope.userInfo._id == $.jStorage.get("user")._id) {
          $scope.userInfo.showButton = true
        }
      } else {

      }
    })
  }



  $scope.backTOlist = function () {
    $scope.countValue = false
  };
})