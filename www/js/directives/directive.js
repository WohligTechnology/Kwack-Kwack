connector.directive('card', function ($http, $filter) {
    return {
        templateUrl: 'templates/directive/news.html',
        link: function ($scope, element, attrs) {
           
        }
    };
  }),
 connector.directive('explore', function ($http, $filter) {
    return {
        templateUrl: 'templates/directive/exploreNews.html',
        link: function ($scope, element, attrs) {
           
        }
    };
  }),
  connector.directive('discover', function ($http, $filter) {
    return {
        templateUrl: 'templates/directive/discoverNews.html',
        link: function ($scope, element, attrs) {
           
        }
    };
  })