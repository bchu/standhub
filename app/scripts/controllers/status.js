'use strict';

angular.module('standhubApp')
  .controller('StatusCtrl', ['$scope', 'Data', function ($scope, Data) {
    //ui customization
    $scope.opts = {
      backdropFade: true,
      dialogFade:true
    };
    $scope.open = function () {
      $scope.shouldBeOpen = true;
    };
    $scope.close = function () {
      $scope.shouldBeOpen = false;
    };
  }]);
