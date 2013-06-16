'use strict';

angular.module('standhubApp')
  .controller('AlertsCtrl', ['$scope', 'Data', '$timeout', function ($scope, Data,$timeout) {
    
    $scope.$watch(
      function() {return Data.requestsToYou;},
      function(requestsToYou) {
        $scope.requestsToYou = requestsToYou;
    }, true);

    var callback = function() {
      var d = Data;
      console.log(d);
      console.log($scope);
      $timeout(callback, 3000);
    };
    $timeout(callback, 3000);
  }]);
