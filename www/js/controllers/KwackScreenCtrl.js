connector.controller('KwackScreenCtrl', function ($scope, $state, $ionicScrollDelegate, $ionicModal, Chats, $ionicLoading) {
  $scope.pollKwack = {}
  $scope.jstorage = $.jStorage.get('user');
  $scope.pollKwack._id = $scope.jstorage._id
  $scope.addInterest={}
  $scope.allInterest={}
  $scope.filterData={}
  $scope.addInterest.userId = $.jStorage.get('user')._id
  $scope.flush=true
  //start of pagination 

  
  $scope.Year=moment().format('YYYY')
  $scope.Month=moment().format('MMMM')
  
 //filter api
  $scope.filter1=function(filterdata){
    
    
    console.log("flushValue",$scope.flush)
   
     console.log('filterdata',filterdata)
    $scope.monthYear={}
    $scope.monthYear=filterdata
      var date = new Date() 
      if(filterdata.Year && filterdata.Month){
        $scope.news=[]
        // $scope.pagination.shouldLoadMore = false;
        y = $scope.monthYear.Year.year
        m = $scope.monthYear.Month.order
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        firstDay = moment(firstDay).format('YYYY-MM-DD')
        lastDay = moment(lastDay).format('YYYY-MM-DD')
        $scope.filterData.startDate = firstDay
        $scope.filterData.endDate = lastDay
        $scope.filterData.interest =  $scope.interestarr
        $scope.filterData.userId = $.jStorage.get('user')._id
        console.log("helloapi")

       
          console.log("helloflush")
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
        
        
          //paginationload10
          $scope.loadMore = function () {
            $ionicScrollDelegate.resize()
            $scope.pagination.shouldLoadMore = false;
            $scope.pagination.currentPage++;
            $scope.pagination1 = {
              "page": $scope.pagination.currentPage,
            }
            $scope.filterData.page = $scope.pagination.currentPage
            Chats.apiCallWithData("NewsInfo/IsPollKwackIf", $scope.filterData, function (data) {
        
              $scope.news = _.concat($scope.news, data.data.results);
              // console.log("changes",$scope.news)
              _.each($scope.news, function (value) {
                value.year = new Date(value.createdAt).getFullYear();
              })
              $scope.dynamicYear = _.uniqBy($scope.news, 'year');
              // console.log("explorepagination", $scope.dynamicYear)
              if (data.data.results.length == 10) {
                $scope.pagination.shouldLoadMore = true;
              }
              $scope.paginationCode();
            });
          };
        
      }
  
    }

    

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
  //end of pagination
  //filter modal start
  $ionicModal.fromTemplateUrl('templates/modal/filter1.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.flush=false
    $scope.modal.show();
    
  }

  $scope.closeModal = function () {
    $scope.modal.hide();
     $state.reload();
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
  //end of modal


  //year array
$scope.year=[]
$scope.repeatYear = $scope.Year
for(i=0;i<20;i++){
  $scope.year.push({year:$scope.repeatYear})
  $scope.year=_.orderBy($scope.year, ['year'], ['asc', 'desc'])
  $scope.repeatYear= $scope.repeatYear - 1
}

  //start of filter modal 
  $scope.months=[]
  $scope.months = [{
      "months": "January",
      "order" : 0
    }, {
      "months": "February",
      "order" : 1
    }, {
      "months": "March",
      "order" : 2
    }, {
      "months": "April",
      "order" : 3
    }, {
      "months": "May",
      "order" : 4
    }, {
      "months": "June",
      "order" : 5
    },
    {
      "months": "July",
      "order" : 6,
    }, {
      "months": "August",
      "order" : 7
    }, {
      "months": "September",
      "order" : 8
    }, {
      "months": "October",
      "order" : 9
    }, {
      "months": "November",
      "order" : 10,
    }, {
      "months": "December",
      "order" : 11
    }

  ]
  $scope.months=_.orderBy($scope.months, ['order'], ['desc', 'asc'])
  // console.log('months',$scope.months)
  // console.log('years',$scope.year)

   //Interest Select filter
  Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
    $scope.allInterest = data.data
    console.log("data is*****************", $scope.allInterest)
    $scope.interestdup = _.chunk($scope.allInterest, 3);
  })

  Chats.apiCallWithData("User/getOne", $scope.pollKwack, function (data) {
    $scope.getInterest = data.data.interests
    $scope.interestarr= data.data.interests
    _.forEach($scope.allInterest, function(allInterest){
      // console.log("fullinterest",allInterest)
      _.forEach($scope.interestarr, function(value){
        // console.log("interestArrayforeach", value)
        if(value.name==allInterest.name){
          allInterest.value=true
        }else{
          console.log("interest not available")
        }
      })
    
    })
    
    console.log("data interest", $scope.getInterest)
  })

 
  $scope.select=function(interest){
    var interestEdit = _.find($scope.interestarr, function (o){
      // console.log("interestarray",o)
      if (interest == o.name) {
        return o;
        console.log("interestarray",o)
      }
      
    });
    if (interestEdit === undefined) {
     $scope.interestarr.push({name:interest})
  
      $scope.addInterest.interest = $scope.interestarr
    // $scope.colorchange = interestEdit
     console.log("checknowpush", $scope.interestarr)
    }else{
     _.pull($scope.interestarr,interestEdit)
      $scope.addInterest.interest = $scope.interestarr
    //  $scope.colorchange = interestEdit
      console.log("checknow", $scope.interestarr)
    }
    Chats.apiCallWithData("User/addInterests", $scope.addInterest, function (data) {
      console.log("data is*****************", data)
      Chats.apiCallWithData("User/getOne", $scope.pollKwack, function (data) {
        $scope.getInterest = data.data.interests
      })
     
      _.forEach($scope.allInterest, function(value){
        // console.log("*******", allInterest)
            console.log("#######", value)
          if(value.name==interest){
            value.value=!value.value
          }
     
      
      })
   }) 
  }

  //filter select kwackpollAll
 $scope.categoryViews=function(data){
   var toggle = false
   console.log('views',data)
   if(data=='All'){
     $scope.filterData.all=!$scope.filterData.all
   }else if(data=='Polls') {
    $scope.filterData.polls=!$scope.filterData.polls
   }else{
    $scope.filterData.kwacks=!$scope.filterData.kwacks
   }
 }

 //filter reset data
$scope.reset=function(data){
  $scope.addInterest={}
  $scope.addInterest.interest=[]
  Chats.apiCallWithData("User/addInterests", $scope.addInterest, function (data) {
    console.log("data is*****************", data)
    Chats.apiCallWithData("User/getOne", $scope.pollKwack, function (data) {
      $scope.getInterest = data.data.interests
    })
  
 }) 

 Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
  $scope.allInterest = data.data
  console.log("data is*****************", $scope.allInterest)
  $scope.interestdup = _.chunk($scope.allInterest, 3);
})

Chats.apiCallWithData("User/getOne", $scope.pollKwack, function (data) {
  $scope.getInterest = data.data.interests
  $scope.interestarr= data.data.interests
  // _.forEach($scope.allInterest, function(allInterest){
  //   // console.log("fullinterest",allInterest)
  //   _.forEach($scope.interestarr, function(value){
  //     // console.log("interestArrayforeach", value)
  //     if(value.name==allInterest.name){
  //       allInterest.value=true
  //     }else{
  //       console.log("interest not available")
  //     }
  //   })
  
  // })
  
  console.log("data interest", $scope.getInterest)
})
  $scope.flush=true;
 console.log('heyya',$scope.flush)
 data.Month=""
 data.Year=""
 $scope.filterData={}
 console.log("kwackpollall",$scope.filterData)

}
  })