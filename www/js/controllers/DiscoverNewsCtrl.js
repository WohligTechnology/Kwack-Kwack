 connector.controller('DiscoverNewsCtrl', function ($scope, $ionicScrollDelegate, Chats, $stateParams, $state, $ionicPlatform, $ionicLoading) {
   $scope.activeTab = 'All'
   $scope.changeTab = function (num) {
     $scope.activeTab = num;
   }

   $scope.poll = {}
   $scope.pollKwack = {}
   $scope.jstorage = $.jStorage.get('user');
   $scope.pollKwack._id = $scope.jstorage._id
   $scope.discoverNews = []
   $scope.doRefresh = function (val) {
     $scope.discoverNews = [],
       $scope.pagination = {
         shouldLoadMore: true,
         currentPage: 0,
       };

     if (!val) {
       $scope.loadMore();
     }
   };

   Chats.apiCallWithoutData("NewsInfo/getTrendingNews", function (data) {
     $scope.trending=data.data
     _.forEach($scope.trending, function (value) {
      _.forEach(value.polls, function (polls1) {
        if (polls1.poll == null) {} else {
          if ($scope.pollKwack._id == polls1.poll.user) {
            value.temp = true
          } else {
            $scope.color = false;
            value.value = value.value;
          }
        }
      })

    })

    _.forEach($scope.trending, function (comments) {
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
  })

   Chats.apiCallWithData("User/getOne", $scope.pollKwack, function (data) {
     $scope.interest = data.data.interests
   })


   $scope.doRefresh(true);

   $scope.loadMore = function () {
     $ionicScrollDelegate.resize()
     $scope.pagination.shouldLoadMore = false;
     $scope.pagination.currentPage++;
     $scope.pagination1 = {
       "page": $scope.pagination.currentPage,
     }
     if ($scope.activeTab == 'All') {
       Chats.apiCallWithData("NewsInfo/getAllNews1", $scope.pagination1, function (data) {
         $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
        
         if (data.data.results.length == 10) {
           $scope.pagination.shouldLoadMore = true;
         }
         console.log("hellorecords", $scope.discoverNews)
         $scope.paginationCode();
       });
     } else if ($scope.activeTab == 'Just now') {
       Chats.apiCallWithData("NewsInfo/getAllNewsJustNow", $scope.pagination1, function (data) {
         $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
         if (data.data.results.length == 10) {
           $scope.pagination.shouldLoadMore = true;
         }
         $scope.paginationCode();
       });
     } else {
       $scope.interestData = {
         "page": $scope.pagination.currentPage,
         "userInterest": $scope.activeTab
       }
       Chats.apiCallWithData("NewsInfo/getNewsByInterest", $scope.interestData, function (data) {
         $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
         if (data.data.results.length == 10) {
           $scope.pagination.shouldLoadMore = true;
         }
         $scope.paginationCode();
       });
     }
   };

   $scope.paginationCode = function () {
     _.forEach($scope.discoverNews, function (value) {
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
     _.forEach($scope.discoverNews, function (comments) {
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
       if(kwackPoll=='poll'){
     Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
       if (data1.value == true) {
         $state.go("polling-inside", {
           newsid: data
         })
       } else {
         $state.go("tab.startPolling", {
           newsid: data
          
         })
        
       }
     })
    }else{
      Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
         console.log("hellodata",data1)
        if (data1.value == true) {
          $state.go("debate", {
            newsid: data
          })
        } else {
          $state.go("tab.trailer", {
            newsid: data
          })
        }
      })
    }
   }
  //  $scope.nextPageforKwack = function (data) {
  //    $state.go("tab.trailer", {
  //      newsid: data
  //    })
  //  }
 })