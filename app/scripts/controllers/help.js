'use strict';

angular.module('standhubApp')
  .controller('HelpCtrl', ['$scope', 'Data', function ($scope, Data) {

    $scope.tagOptions = {
      tags:["AngularJS", "JavaScript","Objective-C", "iOS","Unix","Pitch decks"],
      tokenSeparators: [",",";"],
      maximumSelectionSize:1
    };

    $scope.submitRequest = function(tag,comment) {
      //Data will add 'targets','date',and 'from'
      Data.addRequest({
        tag:tag||'',
        comment: comment||''
      });
    };
  }]);