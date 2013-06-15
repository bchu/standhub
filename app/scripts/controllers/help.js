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

    var requestUrl = $scope.fireUrl + 'helprequests';
    var requests = angularFireCollection(new Firebase(requestUrl));
    $scope.submitRequest = function(skills,comment) {
      var targets = [];
        $scope.messages.add({
          from: 1,
          skill: skills||[],
          comment: comment||'',
          targets: targets
        });
      };
  }]);