 connector.controller('DiscoverNewsCtrl', function($scope) {
  $scope.activeTab=1;
  $scope.changeTab=function(num){
    $scope.activeTab=num;
  }
  
  $scope.discoverNews = [{
       
    "img":"img/discover/newsimg.PNG",
    "news":"India will play five-match ODI series against Australia at home.",
    "desc":" Australia thumped India Board President’s XI side by 103 runs on Tuesday in Chennai to start their campaign on a positivenote. But Marcus Stoinis has certainly expressed his views about the Indian team and suggested that Australia",
    "time":"8 hours ago",
    "likes":"1.2k",
    "poll":"20",
    "kwack":"42",
    "share":"20",
  },
  {
    
 "img":"img/discover/newsimg.PNG",
 "news":"India will play five-match ODI series against Australia at home.",
 "desc":" Australia thumped India Board President’s XI side by 103 runs on Tuesday in Chennai to start their campaign on a positivenote. But Marcus Stoinis has certainly expressed his views about the Indian team and suggested that Australia",
 "time":"8 hours ago",
 "likes":"1.2k",
 "poll":"20",
 "kwack":"42",
 "share":"20",
}]


})