connector.controller('SocialCtrl', function($scope, Chats,  $ionicScrollDelegate) {

    $scope.poll = {}
    $scope.pollKwack = {}
    $scope.jstorage = $.jStorage.get('user');
    $scope.pollKwack._id = $scope.jstorage._id
    $scope.discoverNews = []
    $scope.doRefresh = function (val) {
      $scope.discoverNews = [],
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
    Chats.apiCallWithData("NewsInfo/getSocialNews", $scope.pagination1, function (data) {
        console.log("socialpage",data.data.results)
        $scope.discoverNews = _.concat($scope.discoverNews, data.data.results);
        if (data.data.results.length == 10) {
            $scope.pagination.shouldLoadMore = true;
          }
    })
}



})