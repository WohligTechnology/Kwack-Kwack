 connector.controller('DiscoverNewsCtrl', function ($scope,$ionicScrollDelegate, Chats, $stateParams, $state, $ionicPlatform, $ionicLoading) {
   $scope.activeTab = 1;
   $scope.changeTab = function (num) {
     $scope.activeTab = num;
   }
   $scope.jstorage = $.jStorage.get('user');
   $scope.pollKwack= $scope.jstorage._id
$scope.discoverNews=[]
   $scope.doRefresh = function (val) {
    $scope.discoverNews=[],
    $scope.pagination = {
      shouldLoadMore: true,
      currentPage: 0,
     
    };
    if (!val) {
      $scope.loadMore();
    }
  };
  $scope.poll={}
  $scope.doRefresh(true);
  $scope.loadMore = function () {
    $ionicScrollDelegate.resize()
    console.log("hellowassup")
    $scope.pagination.shouldLoadMore = false;
    $scope.pagination.currentPage++;
    console.log("hellocount",$scope.pagination.currentPage)
    $scope.pagination1={
      "page":$scope.pagination.currentPage,
    }
      Chats.apiCallWithData("NewsInfo/getAllNews1",$scope.pagination1, function (data) {
        console.log("$scope.pagination1",data.data.results.length )
        $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
        console.log("heyya s", $scope.discoverNews)
        if (data.data.results.length == 10) {
          $scope.pagination.shouldLoadMore = true;
          console.log("heyya s", $scope.discoverNews)
          var value =true
          _.forEach($scope.discoverNews,function(value) {
            _.forEach(value.polls,function(polls1){

if(polls1.poll==null){
console.log("hellonull")
value.temp=false
}else{
  if($scope.pollKwack==polls1.poll.user){
    value.temp=true
     }else{
       $scope.color=false;
       value.value=value.value;
     }
}
            })
          
          })
        }else{
          
        }
    
      });
    
  };

  //  Chats.apiCallWithData("NewsInfo/getAllNews1", $scope.data, function (data) {
  //    $scope.discoverNews = data.data.results
  // console.log("heyya saw me length count",$scope.discoverNews )
  // $scope.doRefresh()
  //   //  console.log("data is*****************", $scope.discoverNews)

  //  })
   $scope.nextPage = function (data) {
     console.log("num", data)
     var data1 = {}
     data1.newsId = data,
       data1.userId = $.jStorage.get("user")._id
     Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
       console.log("data is",data1)
       if (data1.value == true) {
         console.log("inside if found")
         $state.go("polling-inside",{
           newsid:data
          })
       } else {
          $state.go("tab.startPolling",{
             newsid:data
          })
         console.log("inside else not found")
       }
     })
   }

   // $scope.newsId = {
   //   _id: $stateParams.discover
   // };


   //   $scope.discoverNews = [{

   //     "img":"img/discover/newsimg.PNG",
   //     "news":"India will play five-match ODI series against Australia at home.",
   //     "desc":" Australia thumped India Board President’s XI side by 103 runs on Tuesday in Chennai to start their campaign on a positivenote. But Marcus Stoinis has certainly expressed his views about the Indian team and suggested that Australia",
   //     "time":"8 hours ago",
   //     "likes":"1.2k",
   //     "poll":"20",
   //     "kwack":"42",
   //     "share":"20",
   //   },
   //   {

   //  "img":"img/discover/newsimg.PNG",
   //  "news":"India will play five-match ODI series against Australia at home.",
   //  "desc":" Australia thumped India Board President’s XI side by 103 runs on Tuesday in Chennai to start their campaign on a positivenote. But Marcus Stoinis has certainly expressed his views about the Indian team and suggested that Australia",
   //  "time":"8 hours ago",
   //  "likes":"1.2k",
   //  "poll":"20",
   //  "kwack":"42",
   //  "share":"20",
   // }]


 })