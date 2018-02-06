# liri node app
A command line app using Node.js to show:
* Latest 20 tweets
* A queried song from Spotify
* A queried movie from OMDB
* A song generated from reading a document

# Code Example
```javascript
function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    console.log(dataArr);
    action = dataArr[0];
    songOrMovie = dataArr[1];
    switch (action) {
      case "spotify-this-song":
        showSong();
        break;
      case "movie-this":
        showMovie();
        break;
    }
  });
}
```





