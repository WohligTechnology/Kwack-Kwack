connector.controller('KwackScreenCtrl', function($scope,$ionicModal,Chats) {
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

      Chats.apiCallWithoutData("NewsInfo/getAllNews", function (data) {
        $scope.news = data.data
    })

    $scope.doRefresh = function (val) {
        $scope.pagination = {
          shouldLoadMore: true,
          currentPage: 0,
          result: []
        };
        if (!val) {
          $scope.loadMore();
        }
      };
      $scope.loadMore = function () {
        $scope.pagination.shouldLoadMore = false;
        $scope.pagination.currentPage++;
        var url = 'Assignment/tasklist';
        if (LocalStorageService.getOnlineStatus()) {
          MyServices.getData(url, { page: $scope.pagination.currentPage }, function (data) {
            $scope.pagination.result = _.concat($scope.pagination.result, data.data);
            if (data.data.length == 10) {
              $scope.pagination.shouldLoadMore = true;
            }
            LocalStorageService.isItLocalStorageData($scope.pagination.result);
            LocalStorageService.saveTaskOnLocalStorage($scope.pagination.result, "task");
            $scope.pagination.resultGroup = LocalStorageService.groupDataByMonth($scope.pagination.result);
            $scope.$broadcast('scroll.refreshComplete');
          });
        } else if (!LocalStorageService.getOnlineStatus()) {
          $scope.pagination.result = LocalStorageService.getTaskFromLocalStorage("task");
          LocalStorageService.isItLocalStorageData($scope.pagination.result);
          $scope.pagination.resultGroup = LocalStorageService.groupDataByMonth($scope.pagination.result);
        }
      };


})
