'use strict';

angular.module('standhubApp')
  .controller('StatusesCtrl', ['$scope', 'Data', function ($scope, Data) {
    $scope.users = [];
    Data.forEachUser(function(user) {
      console.log(user);
      $scope.users.push(user);
      $scope.$apply();
    });

    // $scope.users = [{
    //   firstname: 'gdi2290',
    //   status: 'yolo',
    // },
    // {
    //   firstname: 'gdi2290',
    //   status: 'yolo',
    // }];
  }]);
