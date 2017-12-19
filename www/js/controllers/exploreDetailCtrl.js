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
    $scope.groups= []
    $scope.news = [{
        "news1":"Gotham City Police Department",
        "date1":"Thrusday, 19 Aug 2017",
        "value1": false,
        "img":"img/explore/1.jpg",
        "news":"Game of Thrones: HBO hacker threaten leak of season finale",
        "day":"Thursday",
        "date":"19 Aug 2017",
        "email":"broadly.voice.com",
        "time1":"5m ago",
        "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
        "poll":"20",
        "kwack":"42",
        "share":"20",
        "movie":"Movie",
        "just":"just now"
      
    },
    {
      "news1":"Wayne Enterprises",
      "date1":"Thrusday, 19 Aug 2017",
      "value1": false,
      "img":"img/explore/1.jpg",
      "news":"Game of Thrones: HBO hacker threaten leak of season finale",
      "day":"Thursday",
      "date":"19 Aug 2017",
      "email":"broadly.voice.com",
      "time1":"5m ago",
      "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
      "poll":"20",
      "kwack":"42",
      "share":"20",
      "movie":"Movie",
      "just":"just now"
    
  },
  {
    "news1":"Penguin’s Secret Base",
    "date1":"Thrusday, 19 Aug 2017",
    "value1": false,
    "img":"img/explore/1.jpg",
    "news":"Game of Thrones: HBO hacker threaten leak of season finale",
    "day":"Thursday",
    "date":"19 Aug 2017",
    "email":"broadly.voice.com",
    "time1":"5m ago",
    "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
    "poll":"20",
    "kwack":"42",
    "share":"20",
    "movie":"Movie",
    "just":"just now"
  
},
{
  "news1":"Falcone Crime Family",
  "date1":"Thrusday, 19 Aug 2017",
  "value1": false,
  "img":"img/explore/1.jpg",
  "news":"Game of Thrones: HBO hacker threaten leak of season finale",
  "day":"Thursday",
  "date":"19 Aug 2017",
  "email":"broadly.voice.com",
  "time1":"5m ago",
  "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
  "poll":"20",
  "kwack":"42",
  "share":"20",
  "movie":"Movie",
  "just":"just now"

},
{
  "news1":"Arkham Asylum",
  "date1":"Thrusday, 19 Aug 2017",
  "value1": false,
  "img":"img/explore/1.jpg",
  "news":"Game of Thrones: HBO hacker threaten leak of season finale",
  "day":"Thursday",
  "date":"19 Aug 2017",
  "email":"broadly.voice.com",
  "time1":"5m ago",
  "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
  "poll":"20",
  "kwack":"42",
  "share":"20",
  "movie":"Movie",
  "just":"just now"

},
{
  "news1":"Gotham City Police Department",
  "date1":"Thrusday, 19 Aug 2017",
  "value1": false,
  "img":"img/explore/1.jpg",
  "news":"Game of Thrones: HBO hacker threaten leak of season finale",
  "day":"Thursday",
  "date":"19 Aug 2017",
  "email":"broadly.voice.com",
  "time1":"5m ago",
  "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
  "poll":"20",
  "kwack":"42",
  "share":"20",
  "movie":"Movie",
  "just":"just now"

},
    {
      "news1":"Gotham City Police Department",
      "date1":"Thrusday, 19 Aug 2017",
      "value1": false,
      "img":"img/explore/1.jpg",
      "news":"Game of Thrones: HBO hacker threaten leak of season finale",
      "day":"Thursday",
      "date":"19 Aug 2017",
      "email":"broadly.voice.com",
      "time1":"5m ago",
      "desc":"Attackers dump HBO social media account passwords on the internet following hacks and leaks of unaired TV shows and confidential data",
      "poll":"20",
      "kwack":"42",
      "share":"20",
      "movie":"Movie",
      "just":"just now"
  }]

  $scope.headerHide=function(value){
    console.log("showmeindex",value)
  }
    for (var i=0; i<$scope.news.length; i++) {
      $scope.groups[i] = {
        name: i,
        items: [],
        news:$scope.news[i]
      };
    }
      for (var j=0; j<$scope.news.length; j++) {
      }
    //   }
    //   $scope.groups[i].items.push(i + '-' + j);
    // }

    $scope.toggleGroup = function(value) {
      console.log("showmeindex",value)
      $scope.index=value
        if ($scope.isGroupShown(value)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = value;
        }
      };
      $scope.isGroupShown = function(value) {
        return $scope.shownGroup == value;
        console.log($scope.shownGroup)
      };
      
})