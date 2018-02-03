connector.controller('InviteFriendsCtrl', function (Chats, $scope, $state, $ionicScrollDelegate, $cordovaContacts) {
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
    console.log("contacts search")
    $scope.addContact = function() {
      $cordovaContacts.save($scope.contactForm).then(function(result) {
        // Contact saved
      }, function(err) {
        // Contact error
      });
    };
    
    
     console.log('contacts',$scope.contacts)
      $cordovaContacts.find({}).then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
        $scope.contacts = allContacts;
        console.log('contacts',$scope.contacts)
        $scope.contacts=_.orderBy($scope.contacts, ['displayName'], ['asc'])
        var users =  $scope.contacts
        var log = [];
        
      console.log("var users", users)
      
        $scope.alphabet = iterateAlphabet();
      
        //Sort user list by first letter of name
        var tmp={};
        for(i=0;i<users.length;i++){
          if(users[i].displayName!=null){
            console.log("users[i].displayName", users[i].displayName)
            
            var letter=users[i].displayName.toUpperCase().charAt(0);
            
            
            if( tmp[ letter] ==undefined){
              tmp[ letter]=[]
            }
              tmp[ letter].push( users[i] );
          }
          
        }
        $scope.sorted_users = tmp;
       
        //Click letter event
        $scope.gotoList = function(id){
          $location.hash(id);
          $ionicScrollDelegate.anchorScroll();
        }
      
        //Create alphabet object
        function iterateAlphabet()
        {
           var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
           var numbers = new Array();
           for(var i=0; i<str.length; i++)
           {
              var nextChar = str.charAt(i);
              numbers.push(nextChar);
           }
           return numbers;
        }$scope.groups = [];
        for (var i=0; i<10; i++) {
          $scope.groups[i] = {
            name: i,
            items: []
          };
          for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
          }
        }
        
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
          if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
          } else {
            $scope.shownGroup = group;
          }
        };
        $scope.isGroupShown = function(group) {
          return $scope.shownGroup === group;
        };
      })
    
    
    $scope.findContactsBySearchTerm = function (searchTerm) {
      var opts = {                                           //search options
        filter : searchTerm,                                 // 'Bob'
        multiple: true,                                      // Yes, return any contact that matches criteria
        fields:  [ 'displayName', 'name' ],                  // These are the fields to search for 'bob'.
        desiredFields: [id]    //return fields.
      };
    
      if ($ionicPlatform.isAndroid()) {
        opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
      };
    
      $cordovaContacts.find(opts).then(function (contactsFound) {
        $scope.contacts = contactsFound;
      });
    }
    
    $scope.pickContactUsingNativeUI = function () {
      $cordovaContacts.pickContact().then(function (contactPicked) {
        $scope.contact = contactPicked;
      })
    }
  
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
          if(followType=='mainFollow'){
$scope.doRefresh(true);
console.log("panda", $scope.userInfo)
$scope.userInfo.flag = 'false'
          }else{
            $scope.followingData[index].flag = 'false';
          }
          
         
        })
        // $scope.doRefresh(true);
      } else {
        // $scope.follow =! $scope.follow
        Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.userFollowUnfollow, function (data) {
          console.log("$scope.userFollowUnfollow", data)
           if(followType=='mainFollow'){
            $scope.doRefresh(true);
            console.log("panda", $scope.userInfo)
            $scope.userInfo.flag = 'true'
          }else{
            $scope.followingData[index].flag = 'false';
          }
          
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
    $scope.user.GetUserId = data
    $scope.user.userId = $.jStorage.get("user")._id
    Chats.apiCallWithData("UserFollow/getOneUserDetail", $scope.user, function (data) {
      console.log("user/getOne", data)
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

    Chats.apiCallWithData("Comment/getKwackForOneUser", $scope.userData, function (data) {
      console.log("userFollowUnfollow",data)
      if (data.value == true) {
        $scope.totalKwacks = data.data
      }
    })

    Chats.apiCallWithData("PollAnswer/getPollForOneUser", $scope.userData, function (data) {
      if (data.value == true) {
        $scope.totalPolls = data.data
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