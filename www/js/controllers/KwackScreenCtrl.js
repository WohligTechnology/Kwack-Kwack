connector.controller('KwackScreenCtrl', function($scope,$ionicScrollDelegate,$ionicModal,Chats) {

      $scope.news = []
 

      Chats.apiCallWithoutData("NewsInfo/getAllNews", function (data) {
        $scope.news = data.data
    })

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
          $scope.news = _.concat($scope.news, data.data);
         
          if (data.data.results.length == 10) {
            $scope.pagination.shouldLoadMore = true;
          }
          console.log("hellorecords", $scope.news)
          $scope.paginationCode();
        });
      
    };
    $scope.paginationCode = function () {
      // _.forEach($scope.news, function (value) {
      
      //   value.temp = true
      // })
    //   _.forEach($scope.news, function (comments) {
    //     value.temp = true
 
    //  })
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



})
