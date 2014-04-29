// bootstrap.js
// Ensures that Socket.io starts properly and sets the Lobby ID

function bootstrap() {
  // Make request to server to get cookie
  serverURL = 'http://gameframe.dyndns.org';
  $.ajax({
    url: serverURL+'/ping',
    xhrFields: {
      withCredentials: true
   }
  }).done(function() {
    socket = io.connect(serverURL);
    var injector = angular.bootstrap(document, ['pokerJS']);
    var EventService = injector.get('EventService');
    getLobbyID(EventService)
  });
};

function getLobbyID(EventService) {

  // Retrieve the lobby ID and set it in the event service
  // using several methods (query param, chromecast, ask user directly)
  var lobbyID = $.url().param('lobby');
  var isChromecast = navigator.userAgent.indexOf('CrKey') !== -1;

  // Lobby ID provided as a query parameter in the URL
  if(lobbyID) {
    EventService.setLobbyID(lobbyID);
  }

  // Get lobby ID from device through Chromecast
  else if(isChromecast) {
    cast.receiver.logger.setLevelValue(0);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

    castReceiverManager.onSenderConnected = function(event) {
      console.log('Received Sender Connected event: ' + event.data);
      console.log(window.castReceiverManager.getSender(event.data).userAgent);
      window.castReceiverManager.setApplicationState("Ready");
    };

    window.messageBus =
        window.castReceiverManager.getCastMessageBus('urn:x-cast:com.gameframe.pokergame');

    window.messageBus.onMessage = function(event) {
      var message = event.data;
      EventService.setLobbyID(message);
    };

    window.castReceiverManager.start({statusText: "Application is starting"});
    console.log('Receiver Manager started');
  }

  // Manually prompt the user for the lobby ID
  else {
    lobbyID = null;
    while(true) {
      console.log("Reached here");
      var lobbyID = prompt("Please enter the ID of the lobby you would like to spectate:");
      if (lobbyID != null && lobbyID.length > 0) {
        EventService.setLobbyID(lobbyID);
        break;
      }
    }
  }

};

angular.element(document).ready(bootstrap);
