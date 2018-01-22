connector.controller('InviteFriendsCtrl', function(Chats, $scope) {
  $scope.user={}
  $scope.user.userId=$.jStorage.get('user')._id
    $scope.toggle=true
    $scope.people=function(){
      $scope.toggle = true
    }
    $scope.contact = function(){
      $scope.toggle = false
    }
     $scope.followersb = true;
    $scope.followers=function(){
      $scope.followersb = true;
      $scope.kwacksb = false;
      $scope.pollsb = false;
    }
    $scope.kwacks=function(){
      $scope.followersb = false;
      $scope.kwacksb = true;
      $scope.pollsb = false;
    }
    $scope.polls=function(){
      $scope.followersb = false;
      $scope.pollsb = true;
      $scope.kwacksb = false;
    }

    Chats.apiCallWithData("User/getAllUser", $scope.user, function (data) {
      console.log("Users",data.data)
      $scope.people=data.data
    })
    
    $scope.goBackHandler = function() {
      window.history.back(); //This works
  };
    $scope.unfollow=function(id){
      $scope.user={}
      $scope.user.userFollowed=$.jStorage.get('user')._id
      $scope.user.userFollwing=id
      Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.user, function (data) {
      console.log("Users",data)
})
    }

    $scope.follow1 = function(id){
      console.log("hello",id)
      $scope.user={}
      $scope.user.userFollowed=$.jStorage.get('user')._id
      $scope.user.userFollwing=id
      Chats.apiCallWithData("UserFollow/removeFollowerCount", $scope.user, function (data) {
      console.log("Users",data)
})
    }
  })