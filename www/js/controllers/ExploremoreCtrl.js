connector.controller('ExploremoreCtrl', function ($scope, $stateParams, $state, Chats, $ionicScrollDelegate) {
  $scope.newsId = {}
  $scope.exploreState = $state.current.name
  console.log("$scope.exploreState", $scope.exploreState)
  $scope.newsId.newsId = $stateParams.newsid
  $scope.previousState = $stateParams.previousState
  $scope.newsId.userId = $.jStorage.get('user')._id;
  data = {}
  $scope.dataToSend = {}
  $scope.poll = {}
  $scope.pollKwack = {}
  $scope.jstorage = $.jStorage.get('user');
  $scope.pollKwack._id = $scope.jstorage._id
  data.newsId = $scope.newsId
  $scope.dataToSend.newsId = $stateParams.newsid
  $scope.dataToSend.userId = $.jStorage.get('user')._id
  Chats.setkwackPollStateChange($state.current.name)
  $scope.goToFromState = function () {
    $scope.mainTab = Chats.getkwackPollStateChange();
    $state.go($scope.mainTab.fromState);
    Chats.flushMainTab();
};

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  $scope.inApp = function (link) {
    var options = "location=no,toolbar=yes";
    var target = "_blank";
    $scope.finalURL = link;
    ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
    window.open = cordova.InAppBrowser.open;
  }

  Chats.apiCallWithData("NewsInfo/getOneNews", $scope.newsId, function (data) {
    $scope.news = data.data;
     $scope.doRefresh(true);
  })


  $scope.loadMore = function () {
    $scope.$broadcast('scroll.refreshComplete');
    $scope.pagination = $scope.pagination ? $scope.pagination : {};
    $ionicScrollDelegate.resize();
    $scope.pagination.shouldLoadMore = false;
    $scope.pagination.currentPage++;
    $scope.interestData = {
      page: $scope.pagination.currentPage,
      userInterest: $scope.news.interest,
      newsId: $stateParams.newsid
    }
    Chats.apiCallWithData("NewsInfo/getNewsByInterestWithoutOneNews", $scope.interestData, function (data) {
      $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
      if (data.data.results.length == 10) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.pagination.shouldLoadMore = true;
      }
    });
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

  Chats.apiCallWithData("Readlogs/checkingNewsReadOrNot", $scope.dataToSend, function (data) {
    if (data.value == true) {
    } else {
      Chats.apiCallWithData("Readlogs/readLogsCount", $scope.dataToSend, function (data1) {
        $scope.news = data1.data
      })
    }
  })

  $scope.nextPage = function (data, kwackPoll) {
    var data1 = {}
    data1.newsId = data,
      data1.userId = $.jStorage.get("user")._id
    if (kwackPoll == 'poll') {
      Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
        if (data1.value == true) {
          $state.go("polling-inside", {
            newsid: data,
            previousState: $scope.previousState,
            newState: $state.current.name
          })
        } else {
          var poll = {
            newsid: data,
            previousState: $scope.previousState,
            newState: $state.current.name
          }
          if($state.current.name == 'tab.exploremoresocial'){
            $state.go("tab.startPollingsocial",poll)
          }else if($state.current.name == 'tab.exploremorekwack'){
            $state.go("tab.startPollingkwack",poll)
          }else if ($state.current.name == 'tab.exploremore'){
            $state.go("tab.startPollingex",poll)
          }else{
            $state.go("tab.startPollingdis",poll)
          }
        }
      })
    } else {
      Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
        if (data1.value == true) {
          $state.go("debate", {
            newsid: data,
            previousState: $scope.previousState,
            newState: $state.current.name
          })
        } else {
          var kwack = {
            newsid: data,
            previousState: $scope.previousState,
            newState: $state.current.name
          }
          if($state.current.name == 'tab.exploremoresocial'){
            $state.go("tab.trailersocial",kwack)
          }else if($state.current.name == 'tab.exploremorekwack'){
            $state.go("tab.trailerkwack",kwack)
          }else if ($state.current.name == 'tab.exploremore'){
            $state.go("tab.trailerex",kwack)
          }else{
            $state.go("tab.trailerdis",kwack)
          }
        }
      })
    }
  }
   $scope.socilaSharing = function (desciption, imageUrl, title, link, newsId) {
    console.log("*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", desciption,imageUrl,title,link,newsId)
    $scope.dataToSendApi = {}
    $scope.dataToSendApi.newsId = newsId
    $scope.dataToSendApi.userId = $.jStorage.get('user')._id
    console.log("******************", $scope.dataToSendApi)
     Chats.apiCallWithData("ShareNews/addShareCount", $scope.dataToSendApi, function (data2) {
          console.log("$$$$$$$$$$$$$$$$$$$$", data2)
        })
    // Chats.apiCallWithData("ShareNews/shareNewsOrNot", $scope.dataToSendApi, function (data1) {
    //   console.log("$$$$$$$$$$$$$$$$$$$$", data1)
    //   if (data1.value == true) {
    //     console.log("inside if condi")
    //   } else {
    //     Chats.apiCallWithData("ShareNews/addShareCount", $scope.dataToSendApi, function (data2) {
    //       console.log("$$$$$$$$$$$$$$$$$$$$", data2)
    //     })
    //   }
    // })
    var message = desciption
    var subject = title
    var image = imageUrl
    $cordovaSocialSharing
      .share(message, subject, image, link) // Share via native share sheet
      .then(function (result) {
        $ionicLoading.hide();
        // Success!
      }, function (err) {
        // An error occured. Show a message to the user
        console.log("error : " + err);
      });
  }
})