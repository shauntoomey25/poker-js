'use strict';

/* Controllers */

angular.module('pokerJS.controllers', [])

  .controller('MainCtrl', ['$location', function($location) {
    
    (function() {
      var urlParams = $location.search();
      if(urlParams.lobby) {
        alert("Lobby given: " + urlParams.lobby);
      } else {
        alert("Use Chromecast here");
      }
    })();

  }])

  .controller('PokerCtrl', ['$scope', function($scope) {
    $scope.isWaitingForMatch = true;
  }])

  .controller('ChatCtrl', [function() {
    // Stuff goes here
  }]);
