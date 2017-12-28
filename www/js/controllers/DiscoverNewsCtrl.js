 connector.controller('DiscoverNewsCtrl', function ($scope, Chats, $stateParams, $state) {
   $scope.activeTab = 1;
   $scope.changeTab = function (num) {
     $scope.activeTab = num;
   }

   Chats.apiCallWithoutData("NewsInfo/getAllNews", function (data) {
     $state.reload();
   
     $scope.discoverNews = data.data
  console.log("heyya saw me length count",$scope.discoverNews )
    //  console.log("data is*****************", $scope.discoverNews)

   })
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