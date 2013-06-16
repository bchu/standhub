'use strict';

angular.module('standhubApp')
  .controller('StatusCtrl', ['$scope', 'Data', function ($scope, Data) {
    //ui customization
    $scope.userStatus = '';
    console.log('current User', Data.user);
    // Data.userRef.child('status').set(obj)
    $scope.submitStatus = function() {

      // $scope.userStatus;
      console.log($scope.userStatus);
      console.log(Data.user);
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
        console.log('close');
        $scope.shouldBeOpen = false;
      }
    };
  }]);
