;(function(app) {
'use strict';

/* Status Controller */
app.controller('StatusCtrl', ['$scope', 'Data', function ($scope, Data) {

  $scope.submitStatus = function(userStatus) {
    if (Data.userRef) {
      Data.userRef.child('status').set(userStatus);
      Data.userRef.child('timestamp').set(new Date());
    }
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

}(angular.module('controllers')));
