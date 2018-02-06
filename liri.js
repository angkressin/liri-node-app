require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

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
  var queryUrl = "http://www.omdbapi.com/?t=" + songOrMovie + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl)
  request(queryUrl, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("===========================")
    console.log("Title of the movie: " + JSON.parse(body).Title)
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating of the movie: " + JSON.parse(body).Ratings[0].Value)
    // check if Rotten Tomatoes rating is available
    if (JSON.parse(body).Ratings[1] === undefined) {
      console.log("Rotten Tomatoes Rating of the movie: N/A")
    } else {
      console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value)
    }
    console.log("Country where the movie was produced: " + JSON.parse(body).Country)
    console.log("Language of the movie: " + JSON.parse(body).Language)
    console.log("Plot of the movie: " + JSON.parse(body).Plot)
    console.log("Actors in the movie: " + JSON.parse(body).Actors)
    console.log("===========================")
  } else {
    console.log('error:', error);
  }
});
}
