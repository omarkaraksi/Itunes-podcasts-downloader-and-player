angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('SearchCtrl',function($scope,$http){
    var ctrl =this
    // console.log(ctrl)

    ctrl.search= function(){
      console.log(ctrl)

      if(ctrl.term && ctrl.term.length>2){
        // ctrl.term= ctrl.term.replace(" ","+")
        $http.get('http://localhost:1339/podcasts/searchPodcasts?term='+ctrl.term).then(function(result){

            var pods = result.data
            console.log(pods)
            if(pods.length){
              ctrl.podcasts = pods
            }else{
              $http.get("http://localhost:1339/podcasts/search?term="+ctrl.term+"&entity=podcast&isNew=1").then(function(result){
                ctrl.podcasts = []
                console.log(result)
                if (result)
                  ctrl.podcasts = result.data
              })

            }

            //console.log(result)
        })
      }
    }


})
.controller('TracksCtrl',function($scope,$http,$stateParams){
    var ctrl =this

    var id = $stateParams.id;

    if(id){
      $http.get('http://localhost:1339/podcasts/searchTracks?id='+id).then(function(result){
          //console.log(result.data)
          result.data.map(function(obj){
              obj.url = obj.track_mp3_url
              obj.title = obj.track_title
              return obj
          })
          $scope.tracks = result.data
      })
    }


})
