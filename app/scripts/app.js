'use strict';

angular.module('sailsPodcastsApp', ['restangular'])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/myApp',{
        templateUrl: 'views/myApp.html',
        controller:  'FirstCtrl' 
      })
      .otherwise({
        redirectTo: '/'
      });
      RestangularProvider.setBaseUrl('');
  });
