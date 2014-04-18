'use strict';

/* Controllers */

var app = angular.module('pokerJS.controllers', []);

app.controller('MainCtrl', ['$location', function($location) {
  
  (function() {
    var urlParams = $location.search();
    if(urlParams.lobby) {
      alert("Lobby given: " + urlParams.lobby);
    } else {
      alert("Use Chromecast here");
    }
  })();

}]);

app.controller('PokerCtrl', ['$scope', function($scope) {
  $scope.isWaitingForMatch = true;
}]);

app.controller('ChatCtrl', [function() {
  // Stuff goes here
}]);
