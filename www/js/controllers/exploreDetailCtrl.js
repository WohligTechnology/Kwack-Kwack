connector.controller('ExploreDetailCtrl', function($scope) {

    $scope.exploreNews = [{
        "img":"img/explore/1.jpg",
        "news":"Game of Thrones: HBO hacker threaten leak of season finale",
        "day":"Thursday",
        "date":"19 Aug 2017",
        "email":"broadly.voice.com",
        "time":"8 hours ago",
        "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
        "poll":"20",
        "kwack":"42",
        "share":"20",
        "movie":"Movie",
        "just":"just now"
    }
    ]
    $scope.groups = [{
        "news":"Gotham City Police Department",
        "date":"12"
      
    }];
    // for (var i=0; i<10; i++) {
    //   $scope.groups[i] = {
    //     name: i,
    //     items: []
    //   };
    //   for (var j=0; j<3; j++) {
        
    //   }
    //   $scope.groups[i].items.push(i + '-' + j);
    // }

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };
      
})