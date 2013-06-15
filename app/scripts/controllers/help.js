'use strict';

angular.module('standhubApp')
  .controller('HelpCtrl', ['$scope', 'angularFireCollection', function ($scope, angularFireCollection) {
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
      $scope.messages.add({
        from: $scope.user.id,
        skill: skills||[],
        comment: comment||'',
        targets: targets
      });
      };
  }]);