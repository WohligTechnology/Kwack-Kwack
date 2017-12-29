connector.controller('DebateCtrl', function($scope, $stateParams,Chats, $state) {
        $scope.newsId = $stateParams.newsId
    data = {}
    data.newsId =  $scope.newsId
    console.log(" $scope.newsId", $scope.kwackId)
    Chats.apiCallWithData("NewsInfo/getOneNews", data, function (data1) {
       if (data1.value == true) {
          console.log("data is",data1)
          $scope.newsInfo=data1.data,
          $scope.commentInfo=data1.data.comments
          console.log("  $scope.commentInfo", $scope.commentInfo)
        
        } else {

            console.log("inside else not found")
        }
    })
     $scope.saveComment = function (kwack) {
  
       console.log("comment is",kwack)
dataToSave={}
dataToSave.userId=$.jStorage.get("user")._id
dataToSave.newsId=$stateParams.newsId
dataToSave.comment=kwack
dataToSave.kwack=$stateParams.kwackId
console.log("datatosave",dataToSave)
      Chats.apiCallWithData("Comment/addComment", dataToSave, function (data1) {
       if (data1.value == true) {
          console.log("data is",data1)
          $scope.newsInfo=data1.data.news
          $state.reload()
          console.log(" $scope.newsInfo", $scope.newsInfo)
        
        } else {

            console.log("inside else not found")
        }
    })
   }
    $scope.addLike = function(data){
      console.log("****************************************",data)
      $scope.dataToSend={}
 $scope.dataToSend.commentId=data;
  $scope.dataToSend.userId=$.jStorage.get('user')._id;
  console.log("$scope.dataToSend",$scope.dataToSend)
    };
    $scope.debate = [
      {
          "img":"img/debate/profile1.png",
          "name":"Viraj Kale",
          "thumicon":"img/debate/1.png",
          "time":"8 hours ago",
          "desc":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, officiis. Repellendus qui, aspernatur obcaecati, explicabo eveniet.",
          "likes":"3",
          "replies":"5"
      },
      {
        "img":"img/debate/profile2.png",
        "name":"Rakesh Pujari",
        "thumicon":"img/debate/thum.png",
        "time":"1 day ago",
        "desc":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, officiis. Repellendus qui, aspernatur obcaecati, explicabo eveniet.",
        "likes":"1",
        "replies":"5"
    },
   
    ]

    })