connector.controller('ExploreCtrl', function($scope, $ionicScrollDelegate, Chats) {
    $scope.pollKwack={}
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
          Chats.apiCallWithData("NewsInfo/getAllNewsJustNow", $scope.pagination1, function (data) {
              
            $scope.exploreNews = _.concat($scope.exploreNews, data.data.results);
            console.log("explorepagination", $scope.exploreNews)
            if (data.data.results.length == 10) {
              $scope.pagination.shouldLoadMore = true;
            }
             $scope.paginationCode();
          });
        
      };

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
// $scope.exploreNews = [{
//     "img":"img/explore/1.jpg",
//     "news":"Game of Thrones: HBO hacker threaten leak of season finale",
//     "day":"Thursday",
//     "date":"19 Aug 2017",
//     "email":"broadly.voice.com",
//     "time":"8 hours ago",
//     "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
//     "poll":"20",
//     "kwack":"42",
//     "share":"20",
//     "movie":"Movie",
//     "just":"just now"
// },
// {
//     "img":"img/explore/2.jpg",
//     "news":"OnePlus 5 Slate Gray colour variant with 8GB RAM, 128GB Storage luanched in India",
//     "day":"Thursday",
//     "date":"19 Aug 2017",
//     "email":"broadly.voice.com",
//     "time":"8 hours ago",
//     "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
//     "poll":"20",
//     "kwack":"42",
//     "share":"20",
//     "movie":"Technology",
   
// }]

})