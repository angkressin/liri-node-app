# Liri Node App
A command line app using Node.js to show:
* Latest 20 tweets
* A queried song from Spotify
* A queried movie from OMDB
* A song generated from reading a document

## Getting Started
You will need:
* Terminal (MacOS) or Console (Windows) to run the commands
* npm packages: 
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





