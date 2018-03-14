connector.controller('ExploreCtrl', function ($scope, $ionicScrollDelegate, Chats, $state, $ionicLoading, $rootScope, $ionicHistory,$cordovaSocialSharing) {
  $scope.pollKwack = {};
  $scope.searchInclude = 'templates/discover-full.html';
  $scope.tabHeader = 'templates/tab-header.html';
  $scope.jstorage = $.jStorage.get('user');
  $scope.pollKwack._id = $scope.jstorage._id;
  $scope.loadMore = function () {
    $ionicScrollDelegate.resize()
    $scope.$broadcast('scroll.refreshComplete');
    $scope.pagination.shouldLoadMore = false;
    $scope.pagination.currentPage++;
    $scope.pagination1 = {
      "page": $scope.pagination.currentPage,
      "userId": $scope.jstorage._id
    }
    Chats.apiCallWithData("NewsInfo/getAllNewsJustNow", $scope.pagination1, function (data) {
      $scope.exploreNews = _.concat($scope.exploreNews, data.data.results);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      if (data.data.results.length == 10) {
        $scope.pagination.shouldLoadMore = true;
      }
    });
  };

  $scope.doRefresh = function (val) {
    $scope.exploreNews = [],
      $scope.pagination = {
        shouldLoadMore: true,
        currentPage: 0,
      };
    if (val) {
      $scope.loadMore();
    }
  };

  $scope.doRefresh(true);

  $scope.click = function (data) {}

  $scope.nextPage = function (data, kwackPoll) {
    var data1 = {}
    data1.newsId = data,
      data1.userId = $.jStorage.get("user")._id
    if (kwackPoll == 'poll') {
      Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
        Chats.setkwackPollStateChange($state.current.name)
        if (data1.value == true) {

          $state.go("polling-inside", {
            newsid: data,
            previousState: $state.current.name
          })
        } else {
          $state.go("tab.startPollingex", {
            newsid: data,
            previousState: $state.current.name

          })

        }
      })
    } else {
      Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
        Chats.setkwackPollStateChange($state.current.name)
        if (data1.value == true) {
          $state.go("debate", {
            newsid: data,
          })
        } else {
          $state.go("tab.trailerex", {
            newsid: data,
          })
        }
      })
    }
  }
  //next page exploremore
  $scope.viewsNextPage = function (data) {
    var data1 = {}
    data1.newsId = data,
      Chats.setkwackPollStateChange($state.current.name)
    $state.go("tab.exploremore", {
      newsid: data,
      previousState: $state.current.name
    })
  }
  //socialSharing
  $scope.socilaSharing = function (desciption, imageUrl, title, link, newsId) {
    console.log("*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", desciption, imageUrl, title, link, newsId)
    $scope.dataToSendApi = {}
    $scope.dataToSendApi.newsId = newsId
    $scope.dataToSendApi.userId = $.jStorage.get('user')._id
    console.log("******************", $scope.dataToSendApi)
   
    var message = desciption
    var subject = title
    var image = imageUrl
    $cordovaSocialSharing
      .share(message, subject, image, link) // Share via native share sheet
      .then(function (result) {
        Chats.apiCallWithData("ShareNews/addShareCount", $scope.dataToSendApi, function (data2) {
          console.log("$$$$$$$$$$$$$$$$$$$$", data2)
        })
        console.log("Success");
        console.log(result);
        console.log(image);
      }, function (err) {
        console.log("error : " + err);
      });
  }




})