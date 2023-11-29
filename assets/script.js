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

function getSpotify() {//Needs token 
  var clientId = 'ed507333f63b4e30a1828dea0595685a'
  var clientSecret = '15662e91b9ae4f658b35ab168e4b344e'
  var spotifyUrl = 'https://api.spotify.com/v1/search/?query=' + userInput + '&type=album&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=5'
  fetch(spotifyUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data){
        console.log(data)
      });
}

getSpotify()