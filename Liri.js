require('dotenv').config();
const keys = require("./keys");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

var axios = require("axios");


// if(ProgressEvent.argv[2] === "write"){
//  false.writeFile("random.text", process.argv[3], function(err){
//    if(err) throw err;
//    console.log("wrote a file");
//  });
// }

function movieThis() {
  // with the command of movie-this <title> get data from the 
  // omdb API and show it in the console
  // node app.js movie-this "Titanic"
  const movieTitle = process.argv[3];
  axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
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
  const songTitle = process.argv[3];
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
    case "write":
        writeFile();
        break;
    case "movie-this":
        movieThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    default: 
        console.log("Please pick either write, movie-this, or spotify-this-song");
}