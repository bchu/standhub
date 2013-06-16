'use strict';

angular.module('standhubApp')
  .controller('StatusCtrl', ['$scope', 'Data', function ($scope, Data) {
    $scope.userStatus = '';
    $scope.submitStatus = function(userStatus) {
      Data.userRef.child('status').set(userStatus);
      $scope.close();
    };

    //ui customization:
    $scope.opts = {
      backdropFade: true,
      dialogFade:true
    };
    $scope.open = function () {
      $scope.shouldBeOpen = true;
    };
    $scope.close = function () {
      if ($scope.shouldBeOpen) {
        $scope.shouldBeOpen = false;
      }
    };
  }]);
