var youtubeKey = 'AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg'
var youtubeEl = document.querySelector('.youtube')


function getYoutube() {

    var youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=radiohead&type=video&key=AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg'
    
    fetch(youtubeUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data){
        console.log(data)
            var thumbnails = data.items[1].snippet.thumbnails.medium.url;
            var thumbnailEl = document.createElement('a');
            thumbnailEl.setAttribute('href', 'https://www.youtube.com/watch?v='+ data.items[1].id.videoId)
            var thumbnail = document.createElement('img');
            thumbnail.setAttribute('src', thumbnails);
            
            youtubeEl.append(thumbnailEl);
            thumbnailEl.append(thumbnail);
      });

}
getYoutube()

