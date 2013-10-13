;(function(app) {
'use strict';

/* Statuses Controller */
app.controller('StatusesCtrl', ['$scope', 'Data', function($scope, Data) {
  $scope.users = Data.users;

  $scope.$watchCollection(
  function () {return Data.users;},
  function (users) {
    $scope.users = users;
  });

}]);

}(angular.module('controllers')));
