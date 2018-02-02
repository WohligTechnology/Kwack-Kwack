connector.controller('InviteFriendsCtrl', function (Chats, $scope, $state, $ionicScrollDelegate) {
  $scope.userFollowUnfollow = {}
  $scope.userData = {}
  $scope.userInfo = {}
  $scope.userFollowUnfollow.user = $.jStorage.get('user')._id
  $scope.toggle = true
  $scope.countValue = false
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

  $scope.doRefresh = function (val) {
    $scope.followingData = [],
      $scope.pagination = {
        shouldLoadMore: true,
        currentPage: 0,
      };

    if (!val) {
      $scope.loadMore();
    }
  };

  $scope.doRefresh(true);


  $scope.loadMore = function () {
    $scope.$broadcast('scroll.refreshComplete');
    // $ionicScrollDelegate.resize()
    $scope.pagination.shouldLoadMore = false;
    $scope.pagination.currentPage++;
    $scope.pagination1 = {
      "page": $scope.pagination.currentPage,
      "userId" : $.jStorage.get('user')._id,
      "userFollower": $scope.userFollowUnfollow.userFollower
    }
    if( $scope.countValue == false){
      Chats.apiCallWithData("UserFollow/getAllUser", $scope.pagination1, function (data) {
        $ionicScrollDelegate.resize()
        $scope.followingData = _.concat($scope.followingData, data.data.results);
        console.log("*******************************", $scope.followingData)
          if (data.data.results.length == 10) {
            $scope.pagination.shouldLoadMore = true;
          }
        
          $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }else{
      Chats.apiCallWithData("UserFollow/getAllFollwersNameForInviteFrnd", $scope.pagination1, function (data) {
        console.log("$scope.userFollowUnfollow",data)
        $ionicScrollDelegate.resize()
        $scope.followingData = _.concat($scope.followingData, data.data.results);
        console.log("*******************************", $scope.followingData)
          if (data.data.results.length == 10) {
            $scope.pagination.shouldLoadMore = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }
  
  };

  $scope.followUnfollow=function(userId, followType, index){
    console.log("index", index)
    $scope.userFollowUnfollow.userBeenFollowed = userId
    $scope.userFollowUnfollow.userFollowed = $.jStorage.get('user')._id
    $scope.userFollowUnfollow.userFollwing = userId
    Chats.apiCallWithData("UserFollow/areBothFollowing", $scope.userFollowUnfollow, function (data) {
      console.log("*******************************", data)
      if (data.value == true) { 
        // $scope.follow =! $scope.follow
        Chats.apiCallWithData("UserFollow/removeFollowerCount", $scope.userFollowUnfollow, function (data) {
          console.log("$scope.userFollowUnfollow", data)
          $scope.followingData[index].flag = 'false';
         
        })
        // $scope.doRefresh(true);
      } else {
        // $scope.follow =! $scope.follow
        Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.userFollowUnfollow, function (data) {
          console.log("$scope.userFollowUnfollow", data)
          $scope.followingData[index].flag = 'true';
          
        })
       
        // $scope.doRefresh(true);
      }

    })

  }

  // Chats.apiCallWithData("User/getAllUser", $scope.user, function (data) {
  //   if (data.value == true) {
  //     $scope.people1 = data.data
  //     $scope.LoginUserId = {}
  //     $scope.LoginUserId.userId = $.jStorage.get("user")._id
   
  //   } else {

  //   }

  // })

  

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  
  

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
    $scope.userFollowUnfollow.userFollower = data
    $scope.userFollowUnfollow.userId = $.jStorage.get('user')._id
    
  $scope.doRefresh(true);

  
  }



  $scope.backTOlist = function () {
    $scope.countValue = false
    
  };
})