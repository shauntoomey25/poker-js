'use strict';

/* Controllers */

angular.module('pokerJS.controllers', [])

  .controller('MainCtrl', [function() {
    // Stuff goes here
  }])

  .controller('PokerCtrl', ['$scope', function($scope) {
    $scope.isWaitingForMatch = true;
  }])

  .controller('ChatCtrl', [function() {
    // Stuff goes here
  }]);
