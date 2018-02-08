connector.controller('TrailerCtrl', function($scope, $ionicModal,Chats,$stateParams,$state,ionicToast) {
    $scope.newsId = $stateParams.newsid
    $scope.previousState = $stateParams.previousState
    $scope.newState = $stateParams.newState
    data = {}
    data.newsId = $scope.newsId
     data.userId =$.jStorage.get('user')._id;
    console.log(" $scope.newsId", $scope.previousState)
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
      $scope.setvriableValue = false
    console.log("insid  page", $scope.setvriableValue)
    $scope.goANONYMOUS = function () {
        if ($scope.setvriableValue == false) {
            $scope.setvriableValue = true
            console.log("insid if page", $scope.setvriableValue)
        } else {
            $scope.setvriableValue = false
            console.log("insid else page", $scope.setvriableValue)
        }

    }
   $scope.nextPage = function () {
        if ($scope.kwack1 == undefined) {
            ionicToast.show('Choose Your side', 'top', false, 2500);
        } else {
            console.log("$scope.setvriableValue$scope.setvriableValue$scope.setvriableValue",$scope.setvriableValue)
            if ($scope.setvriableValue == true) {
                console.log("************inside if app")
                $state.go("debate1", {
                    kwackId: $scope.kwack1,
                    newsid: $stateParams.newsid,
                    ann:"ANONYMOUS",
                    previousState: $scope.previousState,
                    newState: $scope.newState
                })
                console.log("hellokwackans", $scope.kwack1)
            } if($scope.setvriableValue == false) {
                  console.log("************inside else app")
                $state.go("debate", {
                    kwackId: $scope.kwack1,
                    newsid: $stateParams.newsid,
                    previousState: $scope.previousState,
                    newState: $scope.newState
                })
                console.log("hellokwackans", $scope.kwack1)
            }


        }

    }
  
  })