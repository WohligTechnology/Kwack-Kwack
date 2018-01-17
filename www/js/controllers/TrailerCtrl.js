connector.controller('TrailerCtrl', function($scope, $ionicModal,Chats,$stateParams,$state,ionicToast) {
    $scope.newsId = $stateParams.newsid
    data = {}
    data.newsId = $scope.newsId
    console.log(" $scope.newsId", $scope.newsId)
    $scope.inApp=function(link){
        console.log(link)
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
            }
    $scope.goBackHandler = function() {
        window.history.back(); //This works
    };
    Chats.apiCallWithData("NewsInfo/getOneNews", data, function (data1) {
       
        if (data1.value == true) {
            $scope.newsInfo = data1.data
        } else {

            console.log("inside else not found")
        }
    })
     $scope.saveKwack = function (kwack) {
       $scope.kwack1=kwack
   
   }
     $scope.nextPage = function () {
    if( $scope.kwack1 == undefined){
          ionicToast.show('Choose Your side', 'top', false, 2500);
    }else{
                $state.go("debate",{
             kwackId: $scope.kwack1,
             newsid:$stateParams.newsid
          })
          console.log("hellokwackans",$scope.kwack1)
      
    }
   
    }
  
  })