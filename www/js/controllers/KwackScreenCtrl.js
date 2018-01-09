connector.controller('KwackScreenCtrl', function($scope,$ionicScrollDelegate,$ionicModal,Chats,$ionicLoading) {
  $scope.poll = {}
  $scope.pollKwack = {}
  $scope.jstorage = $.jStorage.get('user');
  $scope.pollKwack._id = $scope.jstorage._id
      $scope.news = []
 

    //   Chats.apiCallWithoutData("NewsInfo/getAllNews", function (data) {
    //     $scope.news = data.data
    // })

    $scope.doRefresh = function (val) {
      $scope.news = [],
        $scope.pagination = {
          shouldLoadMore: true,
          currentPage: 0,
        };
 
      if (!val) {
        $scope.loadMore();
      }
    };

    $scope.doRefresh(true);

    $scope.loadMore = function () {
      $ionicScrollDelegate.resize()
      $scope.pagination.shouldLoadMore = false;
      $scope.pagination.currentPage++;
      $scope.pagination1 = {
        "page": $scope.pagination.currentPage,
      }
     
        Chats.apiCallWithData("NewsInfo/getAllNews1", $scope.pagination1, function (data) {
          
          $scope.news = _.concat($scope.news, data.data.results);
          console.log("hellorecords",$scope.news)
          if (data.data.results.length == 10) {
            $scope.pagination.shouldLoadMore = true;
          }
          _.each($scope.news,function(value){
      value.year=new Date(value.createdAt).getMonth();
    })
  $scope.dynamicYear =  _.uniqBy($scope.news, 'year');
          $scope.paginationCode();
        });
      
    };
    $scope.paginationCode = function () {
      _.forEach($scope.news, function (value) {
        _.forEach(value.polls, function (polls1) {
          if (polls1.poll == null) {} else {
            if ($scope.pollKwack._id == polls1.poll.user) {
              value.temp = true
            } else {
              value.temp = false;
            }
          }
        })
 
      })
      _.forEach($scope.news, function (comments) {
       _.forEach(comments.comments, function (comments1) {
         if (comments1.comment == null) {} else {
           if ($scope.pollKwack._id == comments1.comment.user) {
             comments.kwack = true
           } else {
             comments.kwack = false;
           }
         }
       })
 
     })
    }

      //filter modal
      $ionicModal.fromTemplateUrl('templates/modal/filter1.html', {
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


  $ionicModal.fromTemplateUrl('templates/modal/filter1.html', {
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
  // $scope.months=["January","Feb","March"]
  $scope.months = [{
      "month": "January"
    }, {
      "month": "February"
    }, {
      "month": "March"
    }, {
      "month": "April",
    }, {
      "month": "May",
    }, {
      "month": "June"
    },
    {
      "month": "July",
    }, {
      "month": "August"
    }, {
      "month": "September"
    }, {
      "month": "October"
    }, {
      "month": "November"
    }, {
      "month": "December"
    }

  ]
  Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
    $scope.allInterest = data.data

    console.log("data is*****************", $scope.allInterest)
    $scope.interestdup = _.chunk($scope.allInterest, 3);
  })
  $scope.searchText = {};
  $scope.search = function (value) {
    $scope.companyCategory = [];
    $scope.isText = true;

    if (value.searchText != "") {
      Chats.apiCallWithData("Interests/globalSearch", value, function (data) {
        console.log("data is", data)
        if (data.value) {
          $scope.Interestsname = data.data.Interests;
          console.log("inside if")
        } else {
          console.log("Event data false");
        }
      });
    }
  };

  Chats.apiCallWithoutData("NewsInfo/getAllNews", function (data) {
    $scope.news1 = data.data
   
    
  })

  // $scope.doRefresh = function (val) {
  //   $scope.pagination = {
  //     shouldLoadMore: true,
  //     currentPage: 0,
  //     result: []
  //   };
  //   if (!val) {
  //     $scope.loadMore();
  //   }
  // };
 


})