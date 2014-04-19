'use strict';

/* Controllers */

var app = angular.module('pokerJS.controllers', []);

app.controller('MainCtrl', function($location, EventService) {
  
  (function() {
    var urlParams = $location.search();
    if(urlParams.lobby) {
      EventService.setLobbyID(urlParams.lobby);
    } else {
      alert("Use Chromecast here");
    }
  })();

});

app.controller('PokerCtrl', function($scope) {
  $scope.isWaitingForMatch = true;
});

app.controller('ChatCtrl', function($scope) {
  $scope.messages = [];
});
