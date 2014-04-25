'use strict';

/* Controllers */

var app = angular.module('pokerJS.controllers', []);

app.controller('MainCtrl', function($location, EventService) {
  
  (function() {

    var urlParams = $location.search();
    if(urlParams.lobby) {

      // Lobby ID was provided in URL
      // i.e. http://example.com/?lobby=12345
      EventService.setLobbyID(urlParams.lobby);

    } else if(navigator.userAgent.indexOf("crKey") > -1) {

      // Connecting via Chromecast
    	this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    	this.customMessageBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.gameframe.pokergame');
    	this.customMessageBus.onMessage = function(event) {
    		var message = event.data;
    		if(message.command == 'start') {
      		EventService.setLobbyID(message.lobby);
    		}
    	}
    	this.castReceiverManager.start();

    } else {

      // Manually prompt the user for the lobby ID
      lobbyID = null;
      while(true) {
        var lobbyID = prompt("Please enter the ID of the lobby you would like to spectate:");
        if (lobbyID != null && lobbyID.length > 0) {
          EventService.setLobbyID(lobbyID);
          break;
        }
      }

    }
  })();

});

app.controller('PokerCtrl', function($scope, $rootScope) {

  // Scope
  $scope.isWaitingForMatch = true;
  $scope.lobby_name = "";
  $scope.userInLock = null;
  $scope.communityCards = null;
  $scope.potSize = null;

  // Listeners
  $rootScope.$on('lobbyNameChanged', function(e, lobbyName) {
    $scope.$apply(function() {
      $scope.lobby_name = lobbyName.toUpperCase();
    });
  });

  $rootScope.$on('lockUpdated', function(e, newLockUser) {
    $scope.$apply(function() {
      $scope.isWaitingForMatch = false;
      $scope.userInLock = newLockUser;
    });
  });

  $rootScope.$on('commonStateUpdated', function(e, state) {
    $scope.$apply(function() {
      $scope.isWaitingForMatch = false;
      $scope.communityCards = state.communityCards;
      $scope.potSize = state.pot;
    });
  });
});

app.controller('ChatCtrl', function($scope, $rootScope, $timeout) {

  // Scope
  $scope.messages = [];
  $scope.chat_title = "";

  // Listeners
  $rootScope.$on('newMessage', function(e, msg) {
    $scope.$apply(function(){
        $scope.chat_title = "Lobby Chat";
        $scope.messages.push(msg);
    });
  });
});
