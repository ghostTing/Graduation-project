angular.module('myApp', ['ui.router', 'ngCookies']).config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('page1');
  $stateProvider
    .state('page1', {
      url: '/page1',
      templateUrl:"view/page1.html",
      cache: true,
      controller: function($scope, $state) {
        console.log("-----enter page1-----");
        var a = '';
      }
    })
    .state('page2', {
      url: '/page2',
      templateUrl:"view/page2.html",
      cache: true,
      controller: function($scope, $state) {
        console.log("-----enter page2------");
      }
    })
    .state('page3', {
      url: '/page3',
      templateUrl:"view/page3.html",
      cache: true,
      controller: 'NoteController'
    });
});