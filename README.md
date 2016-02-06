# Audio Player & Downloader for itunes podcasts

Search , listen and download you favorite podcasts from itunes from android (no tested yet) or web using this amazing app made up using ionic for frontend and sails for the backend

you can configure it for mysql  and  mongodb as well

## Screenshots
![Alt text](podcasts-search-results.png?raw=true "Podcasts Search tab")
![Alt text](tracks-player.png?raw=true "Tracks Download/play tab")

## Installation
---------------

 ##Backend Installation
  1. `cd /path/to/Itunes-podcasts-downloader-and-player`
  2. `sudo npm install`
  3. `sudo bower install`
  4.  then open url: `http://localhost:1339/podcasts/search?term=XXXXXX&entity=podcasts`

 ##frontend Installation
  1. `cd /path/to/Itunes-podcasts-downloader-and-player/frontend-ionic`
  2. `sudo npm install`
  3. `sudo bower install`
  4. `grunt serve`
  5. then open url: `http://localhost:8100/#/app/search`

## Next
  1. deploy on online server (heroku for example)
  2. improving search performance  
  3. test it on android device as its now working only from browser

## Notes
  1. The audio player button [the red one] works on mobile devices supported by `cordova-plugin-media` plugin so it will not work from browsers
  2. I would really be happy with your feedback :)
