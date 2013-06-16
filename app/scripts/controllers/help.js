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
      var targets = [];
      //a 'from' property is added by Data - has user.id
      Data.addRequest({
        skill: skills||[],
        comment: comment||'',
        targets: targets
      });
    };
  }]);