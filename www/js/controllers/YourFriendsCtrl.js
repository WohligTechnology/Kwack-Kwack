connector.controller('YourFriendsCtrl', function ($scope, Chats, $location, $ionicScrollDelegate, $cordovaContacts) {
  $scope.followingId = {}
  $scope.sorted_users = {}
  $scope.followingId.userId = $.jStorage.get("user")._id
  $scope.allpeople = 'all';
  $scope.allcontactpeople = function (data) {
    $scope.allpeople = data;
    $scope.loadMore = function () {
      $scope.$broadcast('scroll.refreshComplete');
      $ionicScrollDelegate.resize()
      $scope.pagination.shouldLoadMore = false;
      $scope.pagination.currentPage++;
      $scope.pagination1 = {
        "page": $scope.pagination.currentPage,
        "userId": $.jStorage.get("user")._id
      }

      if ($scope.allpeople == 'people') {

        Chats.apiCallWithData("UserFollow/getAllUser", $scope.pagination1, function (data) {
          if (data.value == true) {
            $scope.followingData = _.concat($scope.followingData, data.data.results);
            var users = $scope.followingData
            var log = [];
            $scope.alphabet = iterateAlphabet();
            //Sort user list by first letter of name
            var tmp = {};
            for (i = 0; i < users.length; i++) {
              var letter = users[i].name.toUpperCase().charAt(0);
              if (tmp[letter] == undefined) {
                tmp[letter] = []
              }
              tmp[letter].push(users[i]);
            }
            $scope.sorted_users = tmp;

            //Click letter event
            $scope.gotoList = function (id) {
              $location.hash(id);
              $ionicScrollDelegate.anchorScroll();
            }

            //Create alphabet object
            function iterateAlphabet() {
              var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
              var numbers = new Array();
              for (var i = 0; i < str.length; i++) {
                var nextChar = str.charAt(i);
                numbers.push(nextChar);
              }
              return numbers;
            }
            $scope.groups = [];
            for (var i = 0; i < 10; i++) {
              $scope.groups[i] = {
                name: i,
                items: []
              };
              for (var j = 0; j < 3; j++) {
                $scope.groups[i].items.push(i + '-' + j);
              }
            }
            $scope.toggleGroup = function (group) {
              if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
              } else {
                $scope.shownGroup = group;
              }
            };
            $scope.isGroupShown = function (group) {
              return $scope.shownGroup === group;
            };
            if (data.data.results.length == 10) {
              $scope.pagination.shouldLoadMore = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      } else if ($scope.allpeople == 'contact') {} else {
        Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.pagination1, function (data) {
          if (data.value == true) {
            $scope.followingData = _.concat($scope.followingData, data.data.results);
            if (data.data.results.length == 10) {
              $scope.pagination.shouldLoadMore = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }
    }

    $scope.doRefresh = function (val) {
      $scope.followingData = [],
        $scope.pagination = {
          shouldLoadMore: true,
          currentPage: 0,
          userId: $.jStorage.get("user")._id
        };
      if (val) {
        $scope.loadMore();
      }
    };
    $scope.doRefresh(true);
  }

  $scope.allcontactpeople('all')

  $scope.contacts = function () {
    var users = {}
    $scope.addContact = function () {
      $cordovaContacts.save($scope.contactForm).then(function (result) {
        // Contact saved
      }, function (err) {
        // Contact error
      });
    };
    $cordovaContacts.find({}).then(function (allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts;
      $scope.contacts = _.orderBy($scope.contacts, ['displayName'], ['asc'])
      var users = $scope.contacts
      var log = [];
      $scope.alphabet = iterateAlphabet();
      //Sort user list by first letter of name
      var tmp = {};
      for (i = 0; i < users.length; i++) {
        if (users[i].displayName != null) {
          var letter = users[i].displayName.toUpperCase().charAt(0);
          if (tmp[letter] == undefined) {
            tmp[letter] = []
          }
          tmp[letter].push(users[i]);
        }
      }
      $scope.contactuser = tmp;
      //Click letter event
      $scope.gotoList = function (id) {
        $location.hash(id);
        $ionicScrollDelegate.anchorScroll();
      }

      //Create alphabet object
      function iterateAlphabet() {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var numbers = new Array();
        for (var i = 0; i < str.length; i++) {
          var nextChar = str.charAt(i);
          numbers.push(nextChar);
        }
        return numbers;
      }
      $scope.groups = [];
      for (var i = 0; i < 10; i++) {
        $scope.groups[i] = {
          name: i,
          items: []
        };
        for (var j = 0; j < 3; j++) {
          $scope.groups[i].items.push(i + '-' + j);
        }
      }

      $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
      };
    })

    $scope.findContactsBySearchTerm = function (searchTerm) {
      var opts = { //search options
        filter: searchTerm, // 'Bob'
        multiple: true, // Yes, return any contact that matches criteria
        fields: ['displayName', 'name'], // These are the fields to search for 'bob'.
        desiredFields: [id] //return fields.
      };

      if ($ionicPlatform.isAndroid()) {
        opts.hasPhoneNumber = true; //hasPhoneNumber only works for android.
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

  //followUnfollow
  $scope.followUnfollow = function (userId, index, type, parentObject) {
    $scope.userFollowUnfollow = {}
    $scope.userFollowUnfollow.userBeenFollowed = userId
    $scope.userFollowUnfollow.user = $.jStorage.get('user')._id
    $scope.userFollowUnfollow.userFollwing = userId
    $scope.userFollowUnfollow.userFollowed = $.jStorage.get('user')._id
    Chats.apiCallWithData("UserFollow/areBothFollowing", $scope.userFollowUnfollow, function (data) {
      if (data.value == true) {
        Chats.apiCallWithData("UserFollow/removeFollowerCount", $scope.userFollowUnfollow, function (data) {
          if (type == 'all') {
            $scope.followingData[index].userBeenFollowed.flag = 'true'
          } else {
            $scope.sorted_users[parentObject][index].flag = 'false'
          }
        })
      } else {
        Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.userFollowUnfollow, function (data) {
          if (type == 'all') {
            $scope.followingData[index].userBeenFollowed.flag = 'false'
          } else {
            $scope.sorted_users[parentObject][index].flag = 'true'
          }
        })
      }
    })
  }

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  function getAlphaFunc() {
    if ($scope.allpeople == 'people') {
      var users = $scope.people;
    } else {
      var users = $scope.contacts
    }
  }
})