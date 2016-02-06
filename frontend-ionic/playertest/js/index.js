/**
  Just a for fun project :)
*/


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

(function() {
  'use strict';

  angular.module('player', [
    'common.youtube'
  ])

    .config(['$sceProvider', function($sceProvider) {
      $sceProvider.enabled(false);
    }])

    .factory('YouTubePlayer', [function() {

    }])

    .controller('MainCtrl', ['$scope', '$window', '$http', '$timeout', function ($scope, $window, $http, $timeout){
      $scope.main = {
        username: 'MrSuicideSheep',
        iframeUrl: ''
      };

      $scope.playerVolume = 50;

      // TODO: move to service
      var player;
      $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
          height: '38',
          width: '640',
          videoId: '',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      $window.onPlayerReady = function(event) {
        event.target.playVideo();
      }

      $window.onPlayerStateChange = function(event) {
        if (event.data == YT.PlayerState.ENDED) {
          $timeout(function() {
            $scope.setPlayerVolume($scope.playerVolume);
            $scope.selectNextEntry();
          });
        }
      }

      $scope.pauseVideo = function() {
        // TODO use service
        player.pauseVideo();
      }

      $scope.playVideo = function() {
        // TODO use service
        player.playVideo();
      }

      $scope.setPlayerVolume = function(volume) {
        player.setVolume(volume)
      }

      var handle;
      $scope.loadRecentVideos = function() {
        $timeout.cancel(handle);
        $scope.selectedEntry = undefined;
        $scope.main.currentIndex = undefined;
        handle = $timeout(function() {
          $http.get('http://localhost:1339/podcasts/searchTracks?id=1004').success(function(result) {
            $scope.userData = result.data;
          });
        }, 700);
      };

      $scope.selectEntry = function(index) {
        $scope.selectedEntry = $scope.userData.feed.entry[index];

        console.log($scope.main.currentIndex)
        player.loadVideoByUrl($scope.selectedEntry.media$group.media$content[0].url);
        player.playVideo();
                $scope.main.currentIndex = index;
      };

      $scope.selectNextEntry = function() {
        $scope.selectedEntry = undefined;
        $scope.selectEntry($scope.main.currentIndex + 1);
      };

      $scope.loadRecentVideos($scope.main.username);
    }])

})();
