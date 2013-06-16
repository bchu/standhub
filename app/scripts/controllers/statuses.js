'use strict';

angular.module('standhubApp')
  .controller('StatusesCtrl', ['$scope', 'Data', function ($scope, Data) {
    $scope.users = Data.users;

    $scope.$watchCollection(
    function () {return Data.users;},
    function (users) {
      $scope.users = users;
    });

  }]);
