




 .directive('card', function ($http, $filter) {
    return {
        templateUrl: 'templates/directive/news.html',
        scope: {
            model: "=ngModel"
        },
        link: function ($scope, element, attrs) {
            console.log("Directive model: ", $scope.model);
        }
    };
  })
