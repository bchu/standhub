'use strict';

angular.module('standhubApp')
  .controller('StatusCtrl', ['$scope', 'Data', function ($scope, Data) {
    //ui customization
    $scope.userStatus = '';
    $scope.submitStatus = function(userStatus) {
      Data.userRef.child('status').set(userStatus);
      $scope.close();
    };
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
