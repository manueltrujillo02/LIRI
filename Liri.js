require('dotenv').config();
const keys = require("./keys");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const fs = require("fs");
const axios = require("axios");



function concert() {
  const artist = process.argv[3];
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
    console.log("----------------------------------");

    console.log(response.data);
    // console.log(response.request);
    console.log("----------------------------------");
    // console.log(response.headers);
  });
};

function movieThis() {

  const movieTitle = process.argv[3];
  axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(function (response) {
    console.log("----------------------------------");
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("Rating: " + response.data.imdbRating);
    console.log("Plot: " + response.data.Plot);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Actors: " + response.data.Actors);
    console.log("----------------------------------");
  });
}
function spotifyThisSong() {
  var songTitle = process.argv[3];
  spotify.search({ type: 'track', query: songTitle }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (let i = 0; i < data.tracks.items.length; i++) {
      const artistData = data.tracks.items[i];
      console.log("----------------------------------");
      console.log("Artist: " + artistData.artists[0].name);
      console.log("Song Title: " + artistData.name);
      console.log("Preview URL: " + artistData.preview_url);
    }
  });
}
const command = process.argv[2];

switch (command) {
  case "concert-this":
    concert();
    break;
  case "do-what-it-says":
    writeFile();
    break;
  case "movie-this":
    movieThis();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  default:
    console.log("Please pick either concert-this, movie-this, or spotify-this-song");
};



function writeFile() {
  var random = fs.readFileSync("random.text", "utf8");
  
  var songTitle = random;

  spotify.search({ type: 'track', query: songTitle }, function (err, data) {
    console.log("----------------------------------");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Title: " + data.tracks.items[0].name);
    console.log("Preview URL: " + data.tracks.items[0].preview_url);
   
    
    
    console.log("----------------------------------");
    
    
  });



};