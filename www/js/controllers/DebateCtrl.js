connector.controller('DebateCtrl', function ($scope, $stateParams, Chats, $state, $ionicModal, $cordovaSocialSharing, $ionicPlatform) {
    $scope.lellow = false;
    $scope.newsId = $stateParams.newsid
    $scope.kwackAns = $stateParams.kwackId
    $scope.previousState = $.jStorage.get("mainTab").fromState
    $scope.newState = $stateParams.newState
    $scope.anon = $stateParams.ann
    $scope.count = 250;
    $scope.setvarann = false
    if ($stateParams.ann) {
        $scope.setvarann = true
    }
    $scope.news = {}
    $scope.user = {}
    $scope.news.newsId = $scope.newsId
    $scope.news.userId = $.jStorage.get('user')._id;
    $scope.kwackSide = {}
    $scope.kwackSide.userId = $.jStorage.get("user")._id
    $scope.kwackSide.newsId = $scope.newsId
    $scope.goToFromState = function () {
        $scope.mainTab = Chats.getkwackPollStateChange();
        $state.go($scope.mainTab.fromState);
        Chats.flushMainTab();
    };
    $ionicPlatform.registerBackButtonAction(function (e) {
        $scope.mainTab = Chats.getkwackPollStateChange();
        console.log("hello")
        if ($scope.mainTab.fromState == 'tab.explore' || $scope.mainTab.fromState == 'tab.startPollingex' || $scope.mainTab.fromState == 'tab.trailerex' || $scope.mainTab.fromState == 'tab.exploremore') {
            $state.go('tab.explore')
        } else if ($scope.mainTab.fromState == 'tab.discoverNews' || $scope.mainTab.fromState == 'tab.startPollingdis' || $scope.mainTab.fromState == 'tab.trailerdis' || $scope.mainTab.fromState == 'tab.exploremoredis') {
            $state.go('tab.discoverNews')
        } else if ($scope.mainTab.fromState == 'tab.kwackScreen' || $scope.mainTab.fromState == 'tab.startPollingkwack' || $scope.mainTab.fromState == 'tab.trailerkwack' || $scope.mainTab.fromState == 'tab.exploremorekwack') {
            $state.go('tab.kwackScreen')
        } else if ($scope.mainTab.fromState == 'tab.social' || $scope.mainTab.fromState == 'tab.startPollingsocial' || $scope.mainTab.fromState == 'tab.trailersocial' || $scope.mainTab.fromState == 'tab.exploremoresocial') {
            $state.go('tab.social')
        }
    }, 100);
    $scope.inApp = function (link) {
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
    }
    $scope.reply = function (commentId) {
        $scope.commId = commentId,
            $scope.toggle = true
    }

    //getOneNewsapi
    $scope.getOneNewsApi = function () {
        Chats.apiCallWithData("NewsInfo/getOneNews", $scope.news, function (data1) {
            if (data1.value == true) {
                $scope.newsInfo = data1.data;
                $scope.commentInfo = data1.data.comments;
            } else {}
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
        } else {}
    })
    //api for getting news data 
    $scope.getOneNewsApi();
    $scope.saveReply = function (replyText, debateid) {
        $scope.reply = {}
        $scope.reply.commentId = $scope.commId
        $scope.reply.reply = replyText
        $scope.reply.user = $.jStorage.get("user")._id
        $scope.reply.kwack = $scope.kwackAns
        if ($stateParams.ann) {
            $scope.reply.anonymous = "YES";
        } else {
            $scope.reply.anonymous = "NO";
        }
        Chats.apiCallWithData("Comment/addReply", $scope.reply, function (data) {
            if (data.value == true) {
                $state.reload()
            }
        })
    }

    $scope.saveComment = function (kwack) {
        $scope.dataToSave = {}
        $scope.dataToSave.userId = $.jStorage.get("user")._id
        $scope.dataToSave.newsId = $stateParams.newsid
        $scope.dataToSave.comment = kwack
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
                    $scope.addCommentAPi()
                } else {}
            })
        }

    }
    $scope.addCommentAPi = function () {
        Chats.apiCallWithData("Comment/addComment", $scope.dataToSave, function (data1) {
            if (data1.value == true) {
                $scope.newsInfo = data1.data
                $state.reload()
            } else {}
        })
    }

    $ionicModal.fromTemplateUrl('templates/modal/userprofile.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.getOneUserDetails = function (data) {
        Chats.apiCallWithData("UserFollow/getOneUserDetail", data, function (data) {
            if (data.value == true) {
                $scope.userInfo = data.data
                // $scope.userInfo.followUnfollow = false
                // if ($scope.userInfo._id == $.jStorage.get("user")._id) {
                //   $scope.showButton = true
                // }
            } else {}
        })

    }

    $scope.userProfile = function (id) {
        console.log(id)
        $scope.userData = {}
        $scope.userData.userId = id

        // $scope.user._id = id
        $scope.user.GetUserId = id
        $scope.user.userId = $.jStorage.get("user")._id
        $scope.getOneUserDetails($scope.user);

        Chats.apiCallWithData("Comment/getKwackForOneUser", $scope.userData, function (data) {
            if (data.value == true) {
                $scope.totalKwacks = data.data
            }
        })

        Chats.apiCallWithData("PollAnswer/getPollForOneUser", $scope.userData, function (data) {
            if (data.value == true) {
                $scope.totalPolls = data.data
            }
        })
    }

    $scope.followUnfollow = function (userId) {
        console.log("$scope.userInfo", $scope.userInfo)
        $scope.userData = {}
        $scope.userData.userBeenFollowed = userId
        $scope.userData.user = $.jStorage.get('user')._id
        $scope.userData.userFollowed = $.jStorage.get('user')._id
        $scope.userData.userFollwing = userId
        Chats.noLoaderApi("UserFollow/areBothFollowing", $scope.userData, function (data) {
            if (data.value == true) {
                Chats.noLoaderApi("UserFollow/removeFollowerCount", $scope.userData, function (data) {
                    $scope.userInfo.flag = 'false';
                    console.log("$scope.userInfo", $scope.userInfo)
                    $scope.getOneUserDetails($scope.user);
                })
            } else {
                Chats.noLoaderApi("UserFollow/addFollowerCount", $scope.userData, function (data) {
                    $scope.userInfo.flag = 'true';
                    console.log("$scope.userInfo", $scope.userInfo)
                    $scope.getOneUserDetails($scope.user);
                })
            }

        })
    }

    //addLikeFuction
    $scope.addLike = function (data) {
        $scope.dataToSend = {}
        $scope.commentId = data;
        $scope.dataToSend.commentId = data;
        $scope.dataToSend.user = $.jStorage.get('user')._id;
        Chats.apiCallWithData("Comment/addOrRemoveLike", $scope.dataToSend, function (data) {
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
                var pollParams = {
                    newsid: data,
                    previousState: $scope.previousState,
                    newState: $scope.newState
                }
                if ($scope.previousState == 'tab.discoverNews') {
                    $state.go('tab.startPollingdis', pollParams)
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
            $scope.getOneNewsApi();
            if (data1.value == true) {} else {}
        })
    }

    $scope.$watch('commentText', function (newVal, oldVal) {
        console.log(newVal, oldVal)
        // if (newVal.length > 250) {
        //     $scope.value = oldVal;
        // }
    });

    //socislSharing
    $scope.socilaSharing = function (desciption, imageUrl, title, link, newsId) {
        //  $scope.dataToSendApi = {}
        //  $scope.dataToSendApi.newsId = newsId
        //  $scope.dataToSendApi.userId = $.jStorage.get('user')._id
        // Chats.apiCallWithData("ShareNews/addShareCount", $scope.dataToSendApi, function (data1) {
        //        console.log("$$$$$$$$$$$$$$$$$$$$", data1)
        //      })
        $cordovaSocialSharing
            .share(desciption, title, imageUrl, link) // Share via native share sheet
            .then(function (result) {
                // Success!
                console.log("Success");
                console.log(result);
                // console.log(image);
                Chats.apiCallWithData("ShareNews/addShareCount", $scope.dataToSendApi, function (data2) {
                    console.log("$$$$$$$$$$$$$$$$$$$$", data2)
                })
                $scope.getOneNewsApi();
            }, function (err) {
                console.log("error : " + err);
            });
    }
})