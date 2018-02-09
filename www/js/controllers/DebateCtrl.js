connector.controller('DebateCtrl', function ($scope, $stateParams, Chats, $state) {
    $scope.lellow = false;
    $scope.newsId = $stateParams.newsid
    $scope.kwackAns = $stateParams.kwackId
    $scope.previousState = $.jStorage.get("mainTab").fromState
    $scope.newState = $stateParams.newState
    $scope.anon = $stateParams.ann
    console.log("helloanswwer", $scope.previousState)
    $scope.setvarann = false
    if ($stateParams.ann) {
        $scope.setvarann = true
    }
    console.log("helloanswwer", $scope.kwackAns)
    $scope.news = {}
    $scope.news.newsId = $scope.newsId
    $scope.news.userId = $.jStorage.get('user')._id;
    // console.log(" $scope.newsId", $scope.kwackid)
    $scope.kwackSide = {}
    $scope.kwackSide.userId = $.jStorage.get("user")._id
    $scope.kwackSide.newsId = $scope.newsId
    $scope.goToFromState = function () {
        // if ($scope.previousState == 'tab.discoverNews') {
        //     $state.go('tab.discoverNews')
        // } else if ($scope.previousState == 'tab.explore') {
        //     $state.go('tab.explore')
        // } else if ($scope.previousState == 'tab.kwackScreen') {
        //     $state.go('tab.kwackScreen')
        // } else {
        //     $state.go('tab.social')
        // }
        $scope.mainTab = Chats.getkwackPollStateChange();
        $state.go($scope.mainTab.fromState);
        Chats.flushMainTab();
        //This works
    };
    $scope.inApp = function (link) {
        console.log(link)
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
    }
    $scope.reply = function (commentId) {
        console.log("$$$$$$$$$**************************$", commentId)
        $scope.commId = commentId,
            $scope.toggle = true
        console.log($scope.toggle)
    }

    //getOneNewsapi
    $scope.getOneNewsApi = function () {
        Chats.apiCallWithData("NewsInfo/getOneNews", $scope.news, function (data1) {
            if (data1.value == true) {
                $scope.newsInfo = data1.data;
                $scope.commentInfo = data1.data.comments;
                console.log("commentinfo", $scope.newsInfo)
                // _.forEach($scope.commentInfo, function (like) {
                //     if (like.comment.user == $scope.kwackSide.userId) {
                //         $scope.kwackopt = like.comment.kwack
                //         console.log("kwackopt", $scope.kwackopt)
                //     }
                //     console.log("likeforlike", like)
                //     _.forEach(like.comment.likes, function (likes) {
                //         if (likes.userId._id == $scope.kwackSide.userId) {
                //             like.value = true;

                //         } else {
                //             like.value = false;
                //         }
                //     });
                // });

                // _.forEach($scope.commentInfo, function (replylike) {
                //     console.log("likeforlike", replylike)
                //     _.forEach(replylike.comment.repliesTo, function (replylikes) {
                //         console.log("replylike", replylikes)
                //         _.forEach(replylikes.likes, function (rl) {
                //             _.forEach(replylikes.likes, function (rl) {
                //                 console.log("replylike1", rl)
                //                 if (rl == $scope.kwackSide.userId) {
                //                     replylikes.replieslike = true
                //                 } else {
                //                     replylikes.replieslike = false
                //                 }
                //             });
                //         });
                //     });

                // });

                // _.forEach($scope.newsInfo.polls, function (polls) {
                //     console.log("likeforlike", polls)
                //     if (polls.poll != null) {
                //         if (polls.poll.user == $scope.kwackSide.userId) {
                //             $scope.newsInfo.polled = true
                //             console.log("hello")
                //         } else {
                //             $scope.newsInfo.polled = false
                //         }
                //     } else {
                //         console.log("comment array is null")
                //     }
                // });

            } else {

                console.log("inside else not found")
            }
        })
    }
    $scope.showDefaultImg = false
    $scope.userData = {}
    $scope.userData._id = $.jStorage.get("user")._id
    Chats.apiCallWithData("User/getOne", $scope.userData, function (data1) {
        if (data1.value == true) {
            $scope.currentUserInfo = data1.data
            $scope.currentUserInfoPhoto = data1.data.photo
            if (!$scope.currentUserInfoPhoto) {
                $scope.showDefaultImg = true
            }
            console.log('after api called sucefully', $scope.showDefaultImg)

        } else {

            console.log("inside else not found")
        }
    })
    //api for getting news data 
    $scope.getOneNewsApi();

    $scope.saveReply = function (replyText, debateid) {
console.log("**********************",replyText,debateid)
        $scope.reply = {}
        $scope.reply.commentId = $scope.commId
        $scope.reply.reply = replyText
        $scope.reply.user = $.jStorage.get("user")._id
        $scope.reply.kwack = $scope.kwackAns
        console.log("reply", $scope.reply)
        if ($stateParams.ann) {
            $scope.reply.anonymous = "YES";
        }else{
            $scope.reply.anonymous = "NO";
        }
        console.log("%%%%%%%%%%%%%%%%%%%", $scope.reply )
        Chats.apiCallWithData("Comment/addReply", $scope.reply, function (data) {
            console.log("hellodata", data)
            if (data.value == true) {
                $state.reload()
            }

        })
    }

    $scope.saveComment = function (kwack) {

        console.log("comment is", kwack)
        $scope.dataToSave = {}
        $scope.dataToSave.userId = $.jStorage.get("user")._id
        $scope.dataToSave.newsId = $stateParams.newsid
        $scope.dataToSave.comment = kwack
        // dataToSave.kwack = $scope.kwackAns
        console.log("datatosave", $scope.dataToSave)

        if ($stateParams.ann) {
            $scope.dataToSave.anonymous = "YES";
        }
        if ($stateParams.kwackId) {
            $scope.dataToSave.kwack = $scope.kwackAns
            $scope.addCommentAPi()
        } else {
            $scope.datatoSendAPi = {}
            $scope.datatoSendAPi.newsId = $stateParams.newsid
            $scope.datatoSendAPi.userId = $.jStorage.get("user")._id

            Chats.apiCallWithData("Comment/getKwack", $scope.datatoSendAPi, function (data1) {
                if (data1.value == true) {
                    $scope.dataToSave.kwack = data1.data.kwack
                    console.log(" $scope.newsInfo", $scope.dataToSave.kwack)
                    $scope.addCommentAPi()
                } else {

                    console.log("inside else not found")
                }
            })
        }

    }
    $scope.addCommentAPi = function () {
        console.log("$$$$$$$$$$$$$$$$$$$$$", $scope.dataToSave)
                Chats.apiCallWithData("Comment/addComment",   $scope.dataToSave, function (data1) {
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

    //addLikeFuction
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
$scope.nextPage = function (data) {
        var data1 = {}
        data1.newsId = data;
            data1.userId = $.jStorage.get("user")._id;
        Chats.apiCallWithData("PollAnswer/getPoll", data1, function (data1) {
            if (data1.value == true) {
                $state.go("polling-inside", {
                    newsid: data,
                    previousState: $scope.previousState,
                    newState: $scope.newState
                    
                })
            } else {
                var pollParams={ 
                newsid: data,
                previousState: $scope.previousState,
                newState: $scope.newState
                }
                if ($scope.previousState == 'tab.discoverNews') {
                    $state.go('tab.startPollingdis',pollParams) 
                } else if ($scope.previousState == 'tab.explore') {
                    $state.go('tab.startPollingex', pollParams)
                } else if ($scope.previousState == 'tab.kwackScreen') {
                    $state.go('tab.startPollingkwack', pollParams)
                } else {
                    $state.go('tab.startPollingsocial', pollParams)  
                }

            }
        })

    }
    $scope.addLikeToReply = function (replyId, commentId) {
        $scope.dataToSendForReply = {}
        $scope.dataToSendForReply.comm = commentId
        $scope.dataToSendForReply.replyId = replyId
        $scope.dataToSendForReply.userId = $.jStorage.get("user")._id
        Chats.apiCallWithData("Comment/addOrRemoveLikeTOReply", $scope.dataToSendForReply, function (data1) {
            console.log("hellodidntliked")
            $scope.getOneNewsApi();
            if (data1.value == true) {

            } else {


            }
        })
       


    }



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

    //socislSharing
    $scope.socilaSharing = function (desciption, imageUrl, title, link,newsId) {
           //  $scope.dataToSendApi = {}
     //  $scope.dataToSendApi.newsId = newsId
     //  $scope.dataToSendApi.userId = $.jStorage.get('user')._id
     // Chats.apiCallWithData("ShareNews/addShareCount", $scope.dataToSendApi, function (data1) {
     //        console.log("$$$$$$$$$$$$$$$$$$$$", data1)
     //      })
        console.log("description", title)
        console.log("image", link)

        $cordovaSocialSharing
            .share(desciption, title, imageUrl, link) // Share via native share sheet
            .then(function (result) {
                $ionicLoading.hide();
                // Success!
                console.log("Success");

                console.log(result);
                console.log(image);
            }, function (err) {
                // An error occured. Show a message to the user
                console.log("error : " + err);
            });
    }
})