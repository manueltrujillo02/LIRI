require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var command = process.argv[2];

axios 
  .get("https://rest.bandsintown.com/artists/" + command + "/events?app_id=codingbootcamp")
  .then(function(response){
    console.log(response);
    // console.log(JSON.stringify(response, null,2)); 
  });


var spotify = new Spotify(keys.spotify);
    // keys.spotify
    // id: process.env.SPOTIFY_ID,
    // secret: process.env.SPOTIFY_SECRET

   
  spotify.search({ type: 'track', query: command }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  // console.log(JSON.stringify(data.artists, null,2)); 
  // console.log(JSON.stringify(data.name, null,2)); 
  // console.log(JSON.stringify(, null,2)); 
  });