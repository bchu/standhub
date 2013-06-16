'use strict';

angular.module('standhubApp')
  .controller('MainCtrl', ['$scope', 'Data', function ($scope, Data) {

    $scope.test = function() {
      var d = Data;
      var s = $scope;
      debugger;
    }

  }]);
