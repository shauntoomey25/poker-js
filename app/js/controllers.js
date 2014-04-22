// External namespace for cast specific javascript library
var cast = window.cast || {};

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
      var onMessage = function(event) {

      };
    	this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    	this.customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.gameframe.pokergame');
    	this.customMessageBus.onMessage = function(event) {
    		var message = event.data;
    		if(message.command == 'start') {
      		EventService.setLobbyID(message.lobby);
    		}
    	}
    	this.castReceiverManager.start();
    }
  })();

});

app.controller('PokerCtrl', function($scope) {
  $scope.isWaitingForMatch = true;
});

app.controller('ChatCtrl', function($scope) {
  $scope.messages = [];
});
