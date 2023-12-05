var youtubeKey = 'AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg';
var youtubeEl = $('.youtube');
var submitBtn = $('#submitBtn');
var userInput = $('#userInput');
var artist = [];
var contHistEl = $('.history');
var topAlbumEl = $('.topAlbums');
var topSongEl = $('.topSongs');
var artistEl = $('.artistName');


//Pulls the history in the local storage and makes them into clickable buttons
function getHistory() {
  var getartist = JSON.parse(localStorage.getItem('artist'));
  if (!getartist) {
    return;
  }

  $(contHistEl).empty();
 
	for (let i = 0; i < getartist.length; i++) {

		var rowEl = document.createElement('div');
		var btnEl = document.createElement('button');
    btnEl.classList = 'histBtn button';
    btnEl.textContent = (getartist[i].toUpperCase());
		contHistEl.append(rowEl);
		rowEl.append(btnEl);
	}


	$('.histBtn').on("click", function (event) {
		userInput = $(this).text();
    getYoutube();
    getSpotify()
	});
};

//Creates elements and pulls information from the youtube api to be displayed
function getYoutube() {
youtubeEl.empty() 

var heading = document.createElement('h1');
heading.textContent = ('Top Youtube Searches: ');
youtubeEl.append(heading);

    var youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q='+ userInput +'&type=video&key=AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg'
    fetch(youtubeUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data){
        for (let i = 0; i < data.items.length; i++){
            var thumbnails = data.items[i].snippet.thumbnails.medium.url;
            var thumbnailEl = document.createElement('a');
            thumbnailEl.setAttribute('href', 'https://www.youtube.com/watch?v='+ data.items[i].id.videoId);
            var thumbnail = document.createElement('img');
            thumbnail.setAttribute('src', thumbnails);   
            var title = document.createElement('h3');
            title.textContent = (data.items[i].snippet.title)

            youtubeEl.append(thumbnailEl);
            thumbnailEl.append(thumbnail);
            thumbnailEl.append(title);
          };
      });
}

function getSpotify() {
//Generates and encrypts the token 
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
  const codeVerifier  = generateRandomString(64);
  
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
  
  const hashed = sha256(codeVerifier)
  const codeChallenge = base64encode(hashed);
  
  
  function testSpotify() {
    //Uses the client id to gather an access token 
    const clientId = "ed507333f63b4e30a1828dea0595685a";
    const clientSecret = "15662e91b9ae4f658b35ab168e4b344e";
  
    fetch("https://accounts.spotify.com/api/token", {
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        getAlbum(data.access_token);
        getSongs(data.access_token);
        getName(data.access_token);
      });
  
      function getName(token) {
        artistEl.empty()

        var spotifyUrl =
          "https://api.spotify.com/v1/search/?query=" +
          userInput +
          "&type=track&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=3";
  
        fetch(spotifyUrl, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data)
            var nameEl = document.createElement('h3');
            nameEl.textContent = (data.tracks.items[0].artists[0].name);
            artistEl.append(nameEl);
            console.log(nameEl)
          });

      }

   //Function that gets the top albums and makes them into elements   
    function getAlbum(token) {
      topAlbumEl.empty()
      
      var heading = document.createElement('h1');
      heading.textContent = ('Top 3 Albums: ');
      topAlbumEl.append(heading);

      var spotifyUrl =
        "https://api.spotify.com/v1/search/?query=" +
        userInput +
        "&type=album&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=3";

      fetch(spotifyUrl, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          for (let i = 0; i < data.albums.items.length; i++){
            var albums = data.albums.items[i].images[2].url;
            var albumEl = document.createElement('a');
            albumEl.setAttribute('href', data.albums.items[i].external_urls.spotify)
            var album = document.createElement('img');
            album.setAttribute('src', albums);   
            var title = document.createElement('h3');
            title.textContent = (data.albums.items[i].name)

            topAlbumEl.append(albumEl);
            albumEl.append(album);
            albumEl.append(title);
          };
        });
      }

      //Function that gets the top songs and makes them into elements
        function getSongs(token) {
          topSongEl.empty()

          var heading = document.createElement('h1');
          heading.textContent = ('Top 3 Songs: ');
          topSongEl.append(heading);

          var spotifyUrl =
            "https://api.spotify.com/v1/search/?query=" +
            userInput +
            "&type=track&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=3";
          fetch(spotifyUrl, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              for (let i = 0; i < data.tracks.items.length; i++){
                var tracks = data.tracks.items[i].album.images[2].url;
                var tracksEl = document.createElement('a');
                tracksEl.setAttribute('href', data.tracks.items[i].album.external_urls.spotify)
                var album = document.createElement('img');
                album.setAttribute('src', tracks);   
                var title = document.createElement('h3');
                title.textContent = (data.tracks.items[i].name)
    
                topSongEl.append(tracksEl);
                tracksEl.append(album);
                tracksEl.append(title);
              };
            });
    
    }
  }
  testSpotify();
}

//Adds a click ability to the submit button to search
submitBtn.on("click", function (event) {
  event.preventDefault();
  
  userInput = $(this).siblings('#userInput').val();
	if (userInput === '') {
		return;
	};

  artist.push(userInput);
//Stores the History to local storage
	localStorage.setItem('artist', JSON.stringify(artist)); 

  getYoutube();
  getHistory();
  getSpotify();
});
//Keeps the history shown after refresh
getHistory();
