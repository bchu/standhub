'use strict';

angular.module('standhubApp')
  .controller('HelpCtrl', ['$scope', 'Data', function ($scope, Data) {

    $scope.tagOptions = {
      tags:["AngularJS", "JavaScript","Objective-C", "iOS","Unix","Pitch decks"],
      tokenSeparators: [",",";"],
      maximumSelectionSize:1
    };

    $scope.submitRequest = function(tags,comment) {
      //Data will add 'targets','date',and 'from'
      var tag = tags[0] && tags[0].text || '';
      Data.addRequest({
        tag:tag,
        comment: comment||''
      });
      //clear out input fields:
      $scope.tags = null;
      $scope.comment = null;
    };
  }]);