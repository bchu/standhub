'use strict';

angular.module('standhubApp')
  .controller('AlertsCtrl', ['$scope', 'Data', '$timeout', function ($scope, Data,$timeout) {
    $scope.$watch(
      function() {return Data.requestsToYou;},
      function(requestsToYou) {
        $scope.requestsToYou = requestsToYou;
    }, true);
    $scope.$watch(
      function() {return Data.requestsFromYou;},
      function(requestsFromYou) {
        $scope.requestsFromYou = requestsFromYou;
    }, true);

    // var callback = function() {
    //   var d = Data;
    //   console.log(d);
    //   $timeout(callback, 3000);
    // };
    // $timeout(callback, 3000);

    //need to update to show accepted status
    $scope.accept = function(request) {
      var url = Data.requestsUrl + request.refName + '/targets/';
      var ref = (new Firebase(url)).child(Data.user.id);
      ref.set('accept',function() {
        // Data.refreshRequests();
      });

    };
    $scope.decline = function(request) {
      var url = Data.requestsUrl + request.refName + '/targets/';
      var ref = (new Firebase(url)).child(Data.user.id);
      ref.set('decline',function() {
        // Data.refreshRequests();
      });
    };
    $scope.cancel = function(request) {
      var url = Data.requestsUrl + request.refName;
      var ref = new Firebase(url);
      ref.remove(function() {
        // Data.refreshRequests();
      });
    };
  }]);
