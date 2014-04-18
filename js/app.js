'use strict';

// Declare app level module which depends on filters, and services
angular.module('pokerJS', [
  'ngRoute',
  'ngAnimate',
  'pokerJS.services',
  'pokerJS.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
}]);
