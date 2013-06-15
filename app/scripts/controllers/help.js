'use strict';

angular.module('standhubApp')
  .controller('HelpCtrl', ['$scope', 'angularFire', function ($scope, angularFire) {
    var url = $scope.fireUrl + 'helpReqs';
    var promise = angularFire(url, $scope, 'helpReqs', []);

    promise.then(function() {
      // Or, attach a function to $scope that will let a directive in markup manipulate the model.
      $scope.removeItem = function() {
        $scope.items.splice($scope.toRemove, 1);
        $scope.toRemove = null;
      };
    });


    $scope.submitRequest = function(tags,comment) {

    };

  }]);