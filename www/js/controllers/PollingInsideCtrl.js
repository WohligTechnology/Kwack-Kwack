connector.controller('PollingInsideCtrl', function($scope,$stateParams, $state,Chats) {
      $scope.newsId = $stateParams.newsid
      $scope.previousState = $stateParams.previousState
      console.log("previousState", $scope.previousState)
     data = {}
    $scope.userId= $.jStorage.get('user')._id
    $scope.yes=[]
    $scope.no=[]
    data.newsId = $scope.newsId
    data.userId =$.jStorage.get('user')._id;
    console.log(" $scope.newsId", $scope.newsId)
    $scope.inApp=function(link){
        console.log(link)
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
            }
            $scope.back = function() {
                if($scope.previousState == 'tab.discoverNews'){
                    $state.go('tab.discoverNews')
                }else if ($scope.previousState == 'tab.explore'){
                    $state.go('tab.explore')
                }else if ($scope.previousState == 'tab.kwackScreen'){
                    $state.go('tab.kwackScreen')
                }else{
                    $state.go('tab.social')
                }
                 //This works
            };
    Chats.apiCallWithData("NewsInfo/getOneNews", data, function (data1) {
        console.log("data is", data1)
        if (data1.value == true) {
            console.log("inside if found")
            $scope.newsInfo = data1.data
             $scope.TotalKwacks=data1.data.comments.length
            $scope.TotalPoll=data1.data.polls.length
            $scope.yesno = data1.data.polls
            _.forEach($scope.yesno,function(value) {
               
               if(value.poll==null){

               }else if(value.poll.pollOptions=='YES'){  
                $scope.yes.push(value)
                console.log("yes",$scope.yes)
                var yes=$scope.yes.length/$scope.TotalPoll * 100
               $scope.yespercent= _.round(yes)
                console.log("nopercent",$scope.yespercent)
               }else {
                $scope.no.push(value)
                console.log("no",$scope.no)
                var no=$scope.no.length/$scope.TotalPoll * 100
                $scope.nopercent=_.round(no)
                console.log("nopercent",$scope.nopercent)
               }
            });

        //user commented or not 
            // _.forEach($scope.newsInfo.comments,function(kwacks) {
                
            //     if(kwacks.comment!=null){ if(kwacks.comment.user == $scope.userId){
            //         $scope.newsInfo.kwacked=true
            //         console.log("hello")
            //     }else{
            //         $scope.newsInfo.kwacked=false
            //     }
            // }else{
            //     console.log("comment array is null")
            // }
            // });
            // console.log("{{ $scope.newsInfo}}", $scope.newsInfo)
            // console.log("{{ $scope.newsInfo}}", $scope.TotalPoll)
        } else {

            console.log("inside else not found")
        }
    })

    $scope.nextPage = function (data, kwackPoll) {
        var data1 = {}
        data1.newsId = data,
          data1.userId = $.jStorage.get("user")._id
          Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
            console.log("hellodata", data1)
            if (data1.value == true) {
              $state.go("debate", {
                newsid: data,
                previousState: $scope.previousState
              })
            } else {
                var KwackParams={ 
                    newsid: data,
                    previousState: $scope.previousState
                    }
                    if ($scope.previousState == 'tab.discoverNews') {
                        $state.go('tab.trailerdis',KwackParams)
                        
                    } else if ($scope.previousState == 'tab.explore') {
                        $state.go('tab.trailerex', KwackParams)
                    } else if ($scope.previousState == 'tab.kwackScreen') {
                        $state.go('tab.trailerkwack', KwackParams)
                    } else {
                        $state.go('tab.trailersocial', KwackParams)  
                    }
            }
          })
     
      }
     
})