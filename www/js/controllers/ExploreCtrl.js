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
    $scope.pagination.shouldLoadMore = false;
    $scope.pagination.currentPage++;
    $scope.pagination1 = {
      "page": $scope.pagination.currentPage,
    }
    Chats.apiCallWithData("NewsInfo/getExploreNews", $scope.pagination1, function (data) {
console.log("helloexplore", data)
      $scope.exploreNews = _.concat($scope.exploreNews, data.data.results);
      console.log("explorepagination", $scope.exploreNews)
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
          if ($scope.pollKwack._id == polls1.poll.user) {
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
          if ($scope.pollKwack._id == comments1.comment.user) {
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
            newsid: data
          })
        } else {
          $state.go("tab.startPollingex", {
            newsid: data

          })

        }
      })
    } else {
      Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
        console.log("hellodata", data1)
        if (data1.value == true) {
          $state.go("debate", {
            newsid: data
          })
        } else {
          $state.go("tab.trailerex", {
            newsid: data
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