var youtubeKey = 'AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg';
var youtubeEl = $('.youtube');
var submitBtn = $('#submitBtn');
var userInput = $('#userInput');
var artist = [];
contHistEl = $('.history')

submitBtn.on("click", function (event) {
  event.preventDefault();
  
  userInput = $(this).siblings('#userInput').val();
	if (userInput === '') {
		return;
	};

  artist.push(userInput);

	localStorage.setItem('artist', JSON.stringify(artist)); 

  getYoutube();
  getHistory();
});

getHistory();


function getHistory() {
  var getartist = JSON.parse(localStorage.getItem('artist'));
  
  $(contHistEl).empty();
 
	for (let i = 0; i < getartist.length; i++) {

		var rowEl = document.createElement('div');
		var btnEl = document.createElement('button');
    btnEl.classList = 'histBtn';
    btnEl.textContent = (getartist[i].toUpperCase());
		contHistEl.append(rowEl);
		rowEl.append(btnEl);
	} if (!artist) {
		return;
	}

	$('.histBtn').on("click", function (event) {
		userInput = $(this).text();
    getYoutube();
	});
};

function getYoutube() {
youtubeEl.empty()
    var youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q='+ userInput +'&type=video&key=AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg'
    console.log(youtubeUrl)
    fetch(youtubeUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data){
        console.log(data)
        for (let i = 0; i < data.items.length; i++){
            var thumbnails = data.items[i].snippet.thumbnails.medium.url;
            var thumbnailEl = document.createElement('a');
            thumbnailEl.setAttribute('href', 'https://www.youtube.com/watch?v='+ data.items[i].id.videoId)
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
  

const clientId = 'ed507333f63b4e30a1828dea0595685a'
const redirectUri = 'https://christellad.github.io/Show-Tunes/';

const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

const getToken = async code => {

  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application   /x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response =await body.json();

  localStorage.setItem('access_token', response.access_token);
  
}

  let accessToken = localStorage.getItem('access_token');
  var spotifyUrl = 'https://api.spotify.com/v1/search/?query=' + userInput + '&type=album&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=5'
  fetch(spotifyUrl, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })
    .then(function (response) {
        return response.json();
      })
      .then(function (data){
        console.log(data)
      });
}

getSpotify()