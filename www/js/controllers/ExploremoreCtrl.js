connector.controller('ExploremoreCtrl', function ($scope, $stateParams, $state, Chats, $ionicScrollDelegate) {
    $scope.newsId = {}
    $scope.newsId.newsId = $stateParams.newsid
    console.log("newsid", $scope.newsId)
    // $scope.jstorage = $.jStorage.get('user');
    data = {}
    $scope.dataToSend = {}
    $scope.poll = {}
    $scope.pollKwack = {}
    $scope.discoverNews = []
    $scope.jstorage = $.jStorage.get('user');
    $scope.pollKwack._id = $scope.jstorage._id
    data.newsId = $scope.newsId
    $scope.dataToSend.newsId = $stateParams.newsid
    $scope.dataToSend.userId = $.jStorage.get('user')._id
   
  
    $scope.inApp = function (link) {
        console.log(link)
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
    }
    // Chats.apiCallWithData("Readlogs/readLogs",  function (data) {
    //         Chats.apiCallWithData("Readlogs/readLogs", data, function (data1) {
    //             $scope.news = data1.data
    //         if(data.value == true){
    //             Chats.apiCallWithData("Readlogs/checkingNewsReadOrNot", data, function (data) {
    //             $scope.news = data.data
    //             })
    //         }
    //        else{

    //        }
    //  })
    console.log("*******insideif ")
    Chats.apiCallWithData("Readlogs/checkingNewsReadOrNot", $scope.dataToSend, function (data) {
        console.log("readlogs", data)
        if (data.value == true) {
            console.log("insid if")
            Chats.apiCallWithData("NewsInfo/getOneNews", $scope.newsId, function (data) {
                console.log("*******insideif ", data.data.polls)
                $scope.news = data.data;
                console.log($scope.news)
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
                $scope.doRefresh(true);

                $scope.loadMore = function () {
                 
                   $ionicScrollDelegate.resize()
                   $scope.pagination.shouldLoadMore = false;
                   $scope.pagination.currentPage++;
                  //  $scope.pagination1 = {
                  //    "page": $scope.pagination.currentPage,
                  //  }
                   $scope.interestData = {
                    "page": $scope.pagination.currentPage,
                    "userInterest": $scope.news.interest,
                     "newsId":$stateParams.newsid
                  }
              Chats.apiCallWithData("NewsInfo/getNewsByInterestWithoutOneNews", $scope.interestData, function (data) {
                console.log("interestwisedata", data.data.results)
                $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
                if (data.data.results.length == 10) {
                  $scope.pagination.shouldLoadMore = true;
                }
                $scope.paginationCode();
              });
            }
                _.forEach($scope.news.polls, function (data1) {

                    if (data1.poll == null) {} else {
                        if (data1.poll.user == $scope.dataToSend.userId) {
                            $scope.news.polled = true
                        }

                    }

                });

                _.forEach($scope.news.comments, function (data1) {
                    if (data1.comment == null) {} else {
                        if (data1.comment.user == $scope.dataToSend.userId) {
                            $scope.news.kwacked = true
                        }

                    }

                });

            })

        } else {
            console.log("insid else")

            Chats.apiCallWithData("Readlogs/readLogsCount", $scope.dataToSend, function (data1) {
                console.log("inside else", data1)
                $scope.news = data1.data
            })
        }
    })


  
    
  

  $scope.paginationCode = function () {
    _.forEach($scope.discoverNews, function (value) {
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
    _.forEach($scope.discoverNews, function (comments) {
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

})