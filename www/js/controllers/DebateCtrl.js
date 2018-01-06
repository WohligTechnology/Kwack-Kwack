connector.controller('DebateCtrl', function ($scope, $stateParams, Chats, $state) {
    $scope.lellow = false;
    $scope.newsId = $stateParams.newsid
    $scope.kwackAns = $stateParams.kwackId
    console.log("helloanswwer", $scope.kwackAns)
    $scope.news = {}
    $scope.news.newsId = $scope.newsId
    // console.log(" $scope.newsId", $scope.kwackid)
    $scope.kwackSide = {}
    $scope.kwackSide.userId = $.jStorage.get("user")._id
    $scope.kwackSide.newsId = $scope.newsId

    $scope.getOneNewsApi = function () {
        Chats.apiCallWithData("NewsInfo/getOneNews", $scope.news, function (data1) {
            if (data1.value == true) {
                $scope.newsInfo = data1.data;
                $scope.commentInfo = data1.data.comments;
                console.log("commentinfo", $scope.commentInfo)
                _.forEach($scope.commentInfo, function (like) {
                    _.forEach(like.comment.likes, function (likes) {
                        if (likes.userId == $scope.kwackSide.userId) {
                            like.value = true;
                        }else{
                            like.value=false;
                        }
                    });


                });

            } else {

                console.log("inside else not found")
            }
        })
    }


    //api for getting news data 
    $scope.getOneNewsApi();

    $scope.saveReply = function (replyText, debateid) {
        $scope.reply = {}
        $scope.reply.commentId = debateid
        $scope.reply.reply = replyText
        $scope.reply.user = $.jStorage.get("user")._id
        console.log("reply", $scope.reply)
        Chats.apiCallWithData("Comment/addReply", $scope.reply, function (data) {
            console.log("hellodata", data)

        })
    }

    $scope.saveComment = function (kwack) {

        console.log("comment is", kwack)
        dataToSave = {}
        dataToSave.userId = $.jStorage.get("user")._id
        dataToSave.newsId = $stateParams.newsid
        dataToSave.comment = kwack
        dataToSave.kwack = $scope.kwackAns
        console.log("datatosave", dataToSave)


        Chats.apiCallWithData("Comment/addComment", dataToSave, function (data1) {
            if (data1.value == true) {
                console.log("data is", data1)
                $scope.newsInfo = data1.data
                $state.reload()
                console.log(" $scope.newsInfo", $scope.newsInfo)

            } else {

                console.log("inside else not found")
            }
        })
    }
    $scope.addLike = function (data) {

        // $state.reload();
        console.log("****************************************", data)
        $scope.dataToSend = {}
        $scope.commentId = data;
        $scope.dataToSend.commentId = data;
        $scope.dataToSend.user = $.jStorage.get('user')._id;
        console.log("$scope.dataToSend", $scope.dataToSend)

        Chats.apiCallWithData("Comment/addOrRemoveLike", $scope.dataToSend, function (data) {
            console.log("data", data)
            $scope.getOneNewsApi();
        })



    };


    $scope.debate = [{
            "img": "img/debate/profile1.png",
            "name": "Viraj Kale",
            "thumicon": "img/debate/1.png",
            "time": "8 hours ago",
            "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, officiis. Repellendus qui, aspernatur obcaecati, explicabo eveniet.",
            "likes": "3",
            "replies": "5"
        },
        {
            "img": "img/debate/profile2.png",
            "name": "Rakesh Pujari",
            "thumicon": "img/debate/thum.png",
            "time": "1 day ago",
            "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, officiis. Repellendus qui, aspernatur obcaecati, explicabo eveniet.",
            "likes": "1",
            "replies": "5"
        },

    ]

})