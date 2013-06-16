'use strict';

angular.module('standhubApp')
  .controller('AlertsCtrl', ['$scope', 'Data', function ($scope, Data) {
    
    $scope.$watch('Data.requestsToYou', function(requestsToYou) {
      $scope.requestsToYou = requestsToYou;
    },true);
  }]);
