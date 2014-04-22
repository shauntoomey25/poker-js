'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('pokerJS', [
  'ngRoute',
  'ngAnimate',
  'pokerJS.services',
  'pokerJS.controllers',
  'pokerJS.directives',
  'luegg.directives'
]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    });
  $locationProvider.html5Mode(true);
});
