connector.controller('DiscoverFullCtrl', function($scope, Chats) {
    $scope.goBackHandler = function() {
        window.history.back(); //This works
        console.log("goBack")
    };
    $scope.search = function (value) {
        $scope.discoverFull = [];
        $scope.isText = true;
      
        
        if (value.searchText != "") {
            Chats.apiCallWithData("NewsInfo/globalSearchForNews", value, function (data) {
console.log("newsSearch",data.data)
                if (data.data) {
                    $scope.discoverFull = data.data.NewsInfo;
                    console.log("companycategory",$scope.discoverFull)
                } else {
                    console.log("Event data false");
                }
            });
        }
    };
//     $scope.discoverFull = [{
//         "img":"img/discoverFull/cardimg1.png",
//         "news":"Bullet train will boost GSDP of Maharashtra, Gujarat: Devendra Fadnavis",
//         "operator":"Smooth Operators",
//         "day":"Thursday",
//         "date":"19 Aug 2017",
//         "email":"vultures.com",
//         "time":"8 hours ago",
//         "poll":"20",
//         "kwack":"42",
//         "share":"20",
      
//     },
//     {
//         "img":"img/discoverFull/cardimg2.png",
//         "news":"Negative outlook by Fitch; crisil predicts rise in NPAs: Rating agencies raise red flag on banks performance",
//         "operator":"Smooth Operators",
//         "day":"Thursday",
//         "date":"19 Aug 2017",
//         "email":"bombaytimes.com",
//         "time":"8 hours ago",
//         "poll":"20",
//         "kwack":"42",
//         "share":"20",
      
       
//     },
//     {
//         "img":"img/discoverFull/cardimg3.png",
//         "news":"Here’s why there is a sharp surge in petrol, diesel prices",
//         "operator":"Prices Hike",
//         "day":"Thursday",
//         "date":"19 Aug 2017",
//         "email":"vice.com",
//         "time":"8 hours ago",
//         "poll":"20",
//         "kwack":"42",
//         "share":"20",
      
       
//     }, {
//         "img":"img/discoverFull/cardimg4.png",
//         "news":"Feeding ties: India, Japan join hands for ‘cool box service’",
//         "operator":"Seems Normal",
//         "day":"Thursday",
//         "date":"19 Aug 2017",
//         "email":"bloggers.com",
//         "time":"8 hours ago",
//         "poll":"20",
//         "kwack":"42",
//         "share":"20",
        
       
//     }, 
// ]
})