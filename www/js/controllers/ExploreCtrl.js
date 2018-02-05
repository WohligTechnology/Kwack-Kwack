connector.controller('ExploreCtrl', function ($scope, $ionicScrollDelegate, Chats, $state) {
  $scope.pollKwack = {}
  console.log("hello")
  $scope.jstorage = $.jStorage.get('user');
  $scope.pollKwack._id = $scope.jstorage._id
  $scope.doRefresh = function (val) {
    $scope.exploreNews = [],
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
    $ionicScrollDelegate.resize()
    $scope.$broadcast('scroll.refreshComplete');
    $scope.pagination.shouldLoadMore = false;
    $scope.pagination.currentPage++;
    $scope.pagination1 = {
      "page": $scope.pagination.currentPage,
      "userId":$scope.jstorage._id
    }
    Chats.apiCallWithData("NewsInfo/getExploreNews", $scope.pagination1, function (data) {
console.log("helloexplore", data)
      $scope.exploreNews = _.concat($scope.exploreNews, data.data.results);
      console.log("explorepagination", $scope.exploreNews)
      $scope.$broadcast('scroll.infiniteScrollComplete');
      if (data.data.results.length == 10) {
        $scope.pagination.shouldLoadMore = true;
      }
      $scope.paginationCode();
    });

  };

  $scope.click = function (data) {
    console.log('helloclick', data)
  }
  $scope.paginationCode = function () {
    _.forEach($scope.exploreNews, function (value) {
      _.forEach(value.polls, function (polls1) {
        if (polls1.poll == null) {} else {
          if ($scope.pollKwack._id == polls1.poll.user._id) {
            value.temp = true
          } else {
            value.temp = false;
          }
        }
      })

    })
    _.forEach($scope.exploreNews, function (comments) {
      _.forEach(comments.comments, function (comments1) {
        if (comments1.comment == null) {} else {
          if ($scope.pollKwack._id == comments1.comment.user._id) {
            comments.kwack = true
          } else {
            comments.kwack = false;
          }
        }
      })

    })
  }

  $scope.nextPage = function (data, kwackPoll) {
    var data1 = {}
    data1.newsId = data,
      data1.userId = $.jStorage.get("user")._id
    if (kwackPoll == 'poll') {
      Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
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
        console.log("hellodata", data1)
        if (data1.value == true) {
          $state.go("debate", {
            newsid: data,
            previousState: $state.current.name
          })
        } else {
          $state.go("tab.trailerex", {
            newsid: data,
            previousState: $state.current.name
          })
        }
      })
    }
  }
//next page exploremore
  $scope.viewsNextPage = function (data) {
    var data1 = {}
    data1.newsId = data,
       $state.go("tab.exploremore", {
        newsid: data
      })
  }

})