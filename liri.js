require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var argv = process.argv;
var action = argv[2];

var songOrMovie = "";

for (var i = 3; i < argv.length; i++) {
  songOrMovie = songOrMovie + "+" + argv[i];
}

switch (action) {
  case "my-tweets":
    showTweets();
    break;
  case "spotify-this-song":
    showSong();
    break;
  case "movie-this":
    showMovie();
    break;
  case "do-what-it-says":
    doIt();
    break;
  case undefined:
    printInstr();
}

// function definitions

function showSong() {
  if (songOrMovie === "") {
    spotify.search({
      type: 'track',
      query: "The Sign"
    }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      // console.log(JSON.stringify(data, null, 2));
      console.log("===========================")
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("The song name: " + data.tracks.items[0].name);
      console.log("Preview link from Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify);
      console.log("The album that the song is from: " + data.tracks.items[0].album.name);
      console.log("===========================");
    });
  } else {
    spotify.search({
      type: 'track',
      query: songOrMovie
    }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      // console.log(JSON.stringify(data, null, 2));
      console.log("===========================")
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("The song name: " + data.tracks.items[0].name);
      console.log("Preview link from Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify);
      console.log("The album that the song is from: " + data.tracks.items[0].album.name);
      console.log("===========================");
    });
  };
};

function showTweets() {
  client.get('statuses/user_timeline', {
    count: 20
  }, function(error, tweets) {
    if (error) throw error;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
      console.log("===========================");
    }
  });
};

function showMovie() {
  if (songOrMovie === "") {
    var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
  } else {
    queryUrl = "http://www.omdbapi.com/?t=" + songOrMovie + "&y=&plot=short&apikey=trilogy";
  }
  // console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("===========================");
      console.log("Title of the movie: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      // check if IMDB rating is available
      if (JSON.parse(body).Ratings[0] === undefined) {
        console.log("IMDB Rating of the movie: N/A")
      } else {
        console.log("IMDB Rating of the movie: " + JSON.parse(body).Ratings[0].Value);
      }
      // check if Rotten Tomatoes rating is available
      if (JSON.parse(body).Ratings[1] === undefined) {
        console.log("Rotten Tomatoes Rating of the movie: N/A")
      } else {
        console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
      }
      console.log("Country where the movie was produced: " + JSON.parse(body).Country);
      console.log("Language of the movie: " + JSON.parse(body).Language);
      console.log("Plot of the movie: " + JSON.parse(body).Plot);
      console.log("Actors in the movie: " + JSON.parse(body).Actors);
      console.log("===========================");
    } else {
      console.log('error:', error);
    }
  });
}

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

function printInstr() {
  console.log("****** Use node to print out tweets, movie data, song information and stuff");
  console.log("****** Use keywords: 'movie-this' [enter movie name], 'spotify-this-song' [enter song name], 'my-tweets', 'do-what-it-says' to get started!");
}

fs.appendFile("log.txt", action + songOrMovie + "\n", function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Your query was added to the log!");
  }
});
