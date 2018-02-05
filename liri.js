require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

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
    doWhatEv();
    break;
}

// function definitions

function showSong() {
  if (argv.length > 3) {
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
  } else {
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
};
};

function showTweets() {
  client.get('statuses/user_timeline', {count: 20}, function(error, tweets) {
    if(error) throw error;
    for (var i=0; i<tweets.length; i++) {
    console.log(tweets[i].text);
    console.log("===========================")
    }
  });
};

function showMovie() {

}
