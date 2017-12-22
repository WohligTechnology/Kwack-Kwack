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
  }),
  connector.directive('debate', function ($http, $filter) {
    return {
        templateUrl: 'templates/directive/debate.html',
        link: function ($scope, element, attrs) {
           
        }
    };
  }),

  connector.directive('discoverfull', function ($http, $filter) {
    return {
        templateUrl: 'templates/directive/discoverfull.html',
  }
}),
  connector.directive('exploremore', function ($http, $filter) {
    return {
        templateUrl: 'templates/directive/exploremore.html',
        link: function ($scope, element, attrs) {
           
        }
    };
  }),


  connector.directive('uploadImage', function ($http, $filter, $timeout) {
    return {
        templateUrl: 'templates/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            $scope.showImage = function () {};
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple == "true") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {
                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
                $scope.uploadStatus = "removed";
            };
            $scope.removeImage = function (index) {
                $scope.image = [];
                $scope.model.splice(index, 1);
                _.each($scope.model, function (n) {
                    $scope.image.push({
                        url: n
                    });
                });
            }
            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.file.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function (data) {
                    data = data.data;
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {
                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data[0], ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "image";
                        }
                        $scope.model = data.data[0];

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 100);

                });
            };
        }
    };
});
