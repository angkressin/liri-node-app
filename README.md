# Liri Node App
A command line app using Node.js to show:
* My latest 20 tweets
* A queried song from Spotify
* A queried movie from OMDB
* A song generated from reading a document

## Getting Started
You will need:
* Terminal (MacOS) or Console (Windows) to run the commands
* npm packages (also listed in package.json): 
  * FS
  * node-spotify-api
  * twitter
  * request

### Code Example
This switches the task based on the action entered in process.argv[2]

```javascript
switch (action) {
  case "my-tweets":
    showTweets();
    logFile();
    break;
  case "spotify-this-song":
    showSong();
    logFile();
    break;
  case "movie-this":
    showMovie();
    logFile();
    break;
  case "do-what-it-says":
    doIt();
    logFile();
    break;
  case undefined:
    printInstr();
}
```
## How to Use
* Fork or clone the repo to your own computer
* Open Terminal or Console
* Type: node liri.js
* Follow the instructions listed. Four commands are available: 
  * movie-this [enter movie name]
  * spotify-this-song [enter song name]
  * my-tweets
  * do-what-it-says
* example: 
![Terminal Screenshot](terminal_screenshot.png?raw=true "Terminal Screenshot")





