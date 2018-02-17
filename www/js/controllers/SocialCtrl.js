connector.controller('SocialCtrl', function ($scope, $rootScope, Chats, $ionicScrollDelegate, $cordovaSocialSharing, $stateParams, $state, $ionicPlatform) {
  $scope.poll = {}
  $scope.pollKwack = {}
  $scope.jstorage = $.jStorage.get('user');
  $scope.pollKwack._id = $scope.jstorage._id
  $scope.discoverNews = []
  $scope.searchInclude = 'templates/discover-full.html';
  $scope.tabHeader = 'templates/tab-header.html';
  // $scope.fontChange=$rootScope.font
  $scope.loadMore = function () {
    $ionicScrollDelegate.resize()
    $scope.pagination.shouldLoadMore = false;
    $scope.pagination.currentPage++;
    $scope.pagination1 = {
      "page": $scope.pagination.currentPage,
      "userId": $scope.jstorage._id
    }
    Chats.apiCallWithData("NewsInfo/getSocialNews", $scope.pagination1, function (data) {
      $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
      if (data.data.results.length == 10) {
        $scope.pagination.shouldLoadMore = true;
      }
    })
  }

  $scope.doRefresh = function (val) {
    $scope.discoverNews = [],
      $scope.pagination = {
        shouldLoadMore: true,
        currentPage: 0,
      };
    if (val) {
      $scope.loadMore();
    }
  };

  $scope.doRefresh(true);

  $scope.inApp = function (link) {
    var options = "location=no,toolbar=yes";
    var target = "_blank";
    $scope.finalURL = link;
    ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
    window.open = cordova.InAppBrowser.open;
  }

  //kwack polls

  $scope.nextPage = function (data, kwackPoll) {
    var data1 = {}
    data1.newsId = data,
      data1.userId = $.jStorage.get("user")._id
    if (kwackPoll == 'poll') {
      Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
        Chats.setkwackPollStateChange($state.current.name)
        if (data1.value == true) {
          $state.go("polling-inside", {
            newsid: data
          })
        } else {
          $state.go("tab.startPollingdis", {
            newsid: data
          })
        }
      })
    } else {
      Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
        Chats.setkwackPollStateChange($state.current.name)
        if (data1.value == true) {
          $state.go("debate", {
            newsid: data
          })
        } else {
          $state.go("tab.trailerdis", {
            newsid: data
          })
        }
      })
    }
  }

  //socialSharing
  $scope.socilaSharing = function (desciption, imageUrl, title, link, newsId) {
    //  $scope.dataToSendApi = {}
    //  $scope.dataToSendApi.newsId = newsId
    //  $scope.dataToSendApi.userId = $.jStorage.get('user')._id
    // Chats.apiCallWithData("ShareNews/addShareCount", $scope.dataToSendApi, function (data1) {
    //        console.log("$$$$$$$$$$$$$$$$$$$$", data1)
    //      })
    $cordovaSocialSharing
      .share(desciption, title, imageUrl, link) // Share via native share sheet
      .then(function (result) {
        $ionicLoading.hide();
        // Success!
        console.log("Success");
        console.log(result);
        console.log(image);
      }, function (err) {
        // An error occured. Show a message to the user
        console.log("error : " + err);
      });
  }
})