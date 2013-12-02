;(function(app) {
'use strict';

/* Alert Controller */
app.controller('AlertsCtrl', ['$scope', 'Data', function($scope, Data) {

  $scope.requestsToYou = Data.requestsToYou;
  $scope.requestsFromYou = Data.requestsFromYou;

  $scope.$watch(function() {return Data.requestsToYou;},
    function(requestsToYou) {
      $scope.requestsToYou = requestsToYou;
  }, true);

  $scope.$watch(function() {return Data.requestsFromYou;},
    function(requestsFromYou) {
      $scope.requestsFromYou = requestsFromYou;
  }, true);

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

}(angular.module('controllers')));
