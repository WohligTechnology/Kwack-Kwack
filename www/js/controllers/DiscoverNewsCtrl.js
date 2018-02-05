 connector.controller('DiscoverNewsCtrl', function ($scope, $cordovaSocialSharing, $ionicScrollDelegate, Chats, $stateParams, $state, $ionicPlatform) {
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
$scope.dataToSend={}
$scope.dataToSend.userId=$scope.jstorage._id
   Chats.apiCallWithData("NewsInfo/getTrendingNews",$scope.dataToSend, function (data) {
     $scope.trending=data.data
    //  _.forEach($scope.trending, function (value) {
    //   _.forEach(value.polls, function (polls1) {
    //     if (polls1.poll == null) {} else {
    //       if ($scope.pollKwack._id == polls1.poll.user._id) {
    //         value.temp = true
    //       } else {
    //         $scope.color = false;
    //         value.value = value.value;
    //       }
    //     }
    //   })

    // })

    // _.forEach($scope.trending, function (comments) {
    //   _.forEach(comments.comments, function (comments1) {
    //     if (comments1.comment == null) {} else {
    //       if ($scope.pollKwack._id == comments1.comment.user._id) {
    //         comments.kwack = true
    //       } else {
    //         comments.kwack = false;
    //       }
    //     }
    //   })

    // })
  })

   Chats.apiCallWithData("User/getOne", $scope.pollKwack, function (data) {
     $scope.interest = data.data.interests
   })

   console.log("state", $state.current.name)


   $scope.doRefresh(true);

   $scope.loadMore = function () {
     $ionicScrollDelegate.resize()
     $scope.pagination.shouldLoadMore = false;
     $scope.pagination.currentPage++;
     $scope.pagination1 = {
       "page": $scope.pagination.currentPage,
        "userId":$scope.jstorage._id
     }
     if ($scope.activeTab == 'All') {
       Chats.apiCallWithData("NewsInfo/getAllNews1", $scope.pagination1, function (data) {
         $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
        
         if (data.data.results.length == 10) {
           $scope.pagination.shouldLoadMore = true;
         }
         console.log("hellorecords", $scope.discoverNews)
        //  $scope.paginationCode();
       });
     } else if ($scope.activeTab == 'Just now') {
       Chats.apiCallWithData("NewsInfo/getAllNewsJustNow", $scope.pagination1, function (data) {
         $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
         if (data.data.results.length == 10) {
           $scope.pagination.shouldLoadMore = true;
         }
        //  $scope.paginationCode();
       });
     } else {
       $scope.interestData = {
         "page": $scope.pagination.currentPage,
         "userInterest": $scope.activeTab,
         "userId":$scope.jstorage._id
       }
       Chats.apiCallWithData("NewsInfo/getNewsByInterest", $scope.interestData, function (data) {
         $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
         if (data.data.results.length == 10) {
           $scope.pagination.shouldLoadMore = true;
         }
        //  $scope.paginationCode();
       });
     }
   };

  //  $scope.paginationCode = function () {
  //    _.forEach($scope.discoverNews, function (value) {
  //      _.forEach(value.polls, function (polls1) {
  //        if (polls1.poll == null) {} else {
  //          if ($scope.pollKwack._id == polls1.poll.user._id) {
  //            value.temp = true
  //          } else {
  //            value.temp = false;
  //          }
  //        }
  //      })

  //    })
  //    _.forEach($scope.discoverNews, function (comments) {
  //     _.forEach(comments.comments, function (comments1) {
  //       if (comments1.comment == null) {} else {
  //         if ($scope.pollKwack._id == comments1.comment.user._id) {
  //           comments.kwack = true
  //         } else {
  //           comments.kwack = false;
  //         }
  //       }
  //     })

  //   })
  //  }
  
   $scope.nextPage = function (data, kwackPoll) {
    console.log("helloStateParams",$state.current.name )
     var data1 = {}
     data1.newsId = data,
       data1.userId = $.jStorage.get("user")._id
       if(kwackPoll=='poll'){
     Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
       if (data1.value == true) {
         $state.go("polling-inside", {
           newsid: data,
           previousState: $state.current.name
         })
       } else {
         $state.go("tab.startPollingdis", {
           newsid: data,
           previousState: $state.current.name
           
         })
        
       }
     })
    }else{
      Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
         console.log("hellodata",data1)
        if (data1.value == true) {
          $state.go("debate", {
            newsid: data,
            previousState: $state.current.name
          })
        } else {
          $state.go("tab.trailerdis", {
            newsid: data,
            previousState: $state.current.name
          })
        }
      })
    }
   }

   $scope.viewsNextPage = function(data,view){
    var data1 = {}
    data1.newsId = data,
      // data1.userId = $.jStorage.get("user")._id
       $state.go("tab.exploremore", {
          newsid: data
        })

   }

   //socialSharing
   $scope.socilaSharing=function(desciption,imageUrl,title,link){
     console.log("description",title)
     console.log("image",link)
     var message=desciption
     var subject = title
     var image = imageUrl
     $cordovaSocialSharing
     .share(message, subject, image,link) // Share via native share sheet
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