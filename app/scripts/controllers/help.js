'use strict';

angular.module('standhubApp')
  .controller('HelpCtrl', ['$scope', 'Data', function ($scope, Data) {
    // var url = $scope.fireUrl + 'helpReqs';
    // var promise = angularFire(url, $scope, 'helpReqs', []);

    // promise.then(function() {
    //   // Or, attach a function to $scope that will let a directive in markup manipulate the model.
    //   $scope.removeItem = function() {
    //     // $scope.items.
    //   };
    // });

    $scope.submitRequest = function(skills,comment) {
      //Data will add 'targets','date',and 'from'
      Data.addRequest({
        skill: skills||[],
        comment: comment||''
      });
    };
  }]);