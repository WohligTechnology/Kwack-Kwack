connector.controller('InviteFriendsCtrl', function (Chats, $scope, $state) {
  $scope.user = {}
  $scope.userData = {}
  $scope.userInfo = {}
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
              console.log("peopleData._id",peopleData._id)
              console.log("followingUserData.userBeenFollowed._id",followingUserData.userBeenFollowed)
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

  //follow
  $scope.follow = function (id) {
    console.log("hello", id)
    // $scope.follow = true
    $scope.userInfo.followed = true
    // $scope.user = {}
    $scope.user.userFollowed = $.jStorage.get('user')._id
    $scope.user.userFollwing = id
    Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.user, function (data) {
      // console.log("Users", data)
      // $state.reload()
      Chats.apiCallWithData("User/getAllUser", $scope.user, function (data) {
        _.forEach($scope.people1, function (peopleData) {
          if (peopleData._id == id) {
            peopleData.showUnfollowbutton = true
          }
        })
      })

      _.forEach($scope.count, function (Follow) {
       
        if ($scope.userInfo._id == Follow.user._id) {
          
          $scope.userInfo.followUnfollow = false
        }else{
          $scope.userInfo.followUnfollow = true
        }
       
      })
      Chats.apiCallWithData("UserFollow/getAllFollowerName", $scope.userData, function (data) {
        $scope.count=data.data
        // console.log("$scope.count", $scope.count)
      })
     
      Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.LoginUserId, function (data) {
        if (data.value == true) {
          $scope.followingData = data.data

           _.forEach($scope.count, function (peopleData) {
            // console.log("$scope.coun", peopleData)
            // if ($scope.userInfo._id == peopleData.user._id) {
              
            //   $scope.userInfo.followUnfollow =! $scope.userInfo.followUnfollow
            // }else{
            //   $scope.userInfo.followUnfollow =! $scope.userInfo.followUnfollow
            // }
            _.forEach($scope.followingData, function (followingUserData) {
              if(peopleData.user._id== $.jStorage.get("user")._id){
                peopleData.user.showButton=true
              }
            });

          });
          // console.log("$scope.followingData", $scope.followingData)
          // _.forEach($scope.count, function (OtherFollowerMatch) {
           
          //   if(id==OtherFollowerMatch.user._id){
             
          //     console.log("too confusing")
          //     OtherFollowerMatch.showUnfollowbutton= true
          //     console.log("Usersfollow", OtherFollowerMatch)
          //   }else{
              
          //   }
          // })
        }
      })
    })

    
  }

  //unfollow1
  $scope.unfollow = function (id) {
    // $scope.follow = false;
    console.log("hello", id)
    $scope.user = {}
    $scope.user.userFollowed = $.jStorage.get('user')._id
    $scope.userInfo.followed = false
    $scope.user.userFollwing = id
    Chats.apiCallWithData("UserFollow/removeFollowerCount", $scope.user, function (data) {
      
      // $state.reload()
      Chats.apiCallWithData("User/getAllUser", $scope.user, function (data) {
        
        _.forEach($scope.people1, function (peopleData) {
          if (peopleData._id == id) {
            peopleData.showUnfollowbutton = false
          }
        })
      })
      _.forEach($scope.count, function (Unfollow) {
        // console.log("$scope.coun", Unfollow)
        if ($scope.userInfo._id != Unfollow.user._id) {
          // console.log("$scope.userInfo", $scope.userInfo)
          $scope.userInfo.followUnfollow = false
        }else{
          $scope.userInfo.followUnfollow = true
        }
        Chats.apiCallWithData("UserFollow/getAllFollowerName", $scope.userData, function (data) {
          $scope.count=data.data
        })
      })
      Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.LoginUserId, function (data) {
        if (data.value == true) {
          _.forEach($scope.count, function (peopleData) {
            // console.log("$scope.coun", peopleData)
            // if ($scope.userInfo._id == peopleData.user._id) {
              
            //   $scope.userInfo.followUnfollow =! $scope.userInfo.followUnfollow
            // }else{
            //   $scope.userInfo.followUnfollow =! $scope.userInfo.followUnfollow
            // }
            _.forEach($scope.followingData, function (followingUserData) {
             if(peopleData.user._id== $.jStorage.get("user")._id){
                peopleData.user.showButton=true
              }
            });

          });
          $scope.followingData = data.data
          // console.log("$scope.followingData", $scope.followingData)
        
            // _.forEach($scope.count, function (OtherFollowerMatch) {
            //   console.log("Users", OtherFollowerMatch)
            //   if(id==OtherFollowerMatch.user._id){
                
            //     console.log("too confusing")
            //     OtherFollowerMatch.showUnfollowbutton = false
            //     console.log("UsersUnfollow", OtherFollowerMatch)
            //   }else{
                
            //   }
            // })
         
        }
      })
    })
    
  }
  $scope.countValue = false
  $scope.setFollowCountValueZero = false


  $scope.selectedUser = function (data) {
    $scope.countValue = true
    
    $scope.userData.userId = data
    $scope.user = {}
    $scope.user._id = data

    Chats.apiCallWithData("User/getOne", $scope.user, function (data) {
      if (data.value == true) {

        $scope.userInfo = data.data
        $scope.userInfo.followUnfollow=false
        // _.forEach($scope.count, function (peopleData) {

        // })
        if ($scope.userInfo._id == $.jStorage.get("user")._id) {
          $scope.userInfo.showButton = true
        }
      } else {

      }
    })

    Chats.apiCallWithData("UserFollow/getAllFollowerName", $scope.userData, function (data) {
      if (data.value == true) {
        $scope.count = {}
        $scope.count = data.data
        $scope.LoginUserId = {}
        $scope.LoginUserId.userId = $.jStorage.get("user")._id
       
       
        Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.LoginUserId, function (data) {
          
          
            // console.log("$scope.coun", $scope.count)
            $scope.followingData = data.data
            _.forEach($scope.count, function (peopleData) {
              // console.log("$scope.coun", peopleData)
              if ($scope.userInfo._id == peopleData.user._id) {
                
                $scope.userInfo.followUnfollow =! $scope.userInfo.followUnfollow
              }else{
                $scope.userInfo.followUnfollow =! $scope.userInfo.followUnfollow
              }
              _.forEach($scope.followingData, function (followingUserData) {
                if (peopleData.user._id == followingUserData.userBeenFollowed._id) {
                  peopleData.showUnfollowbutton = true

                }if(peopleData.user._id== $.jStorage.get("user")._id){
                  peopleData.user.showButton=true
                }
              });

            });
            console.log(" $scope.count  $scope.count  $scope.count  $scope.count  $scope.count  $scope.count ", $scope.count)
         

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

  
  }



  $scope.backTOlist = function () {
    $scope.countValue = false
  };
})