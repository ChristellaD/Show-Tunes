var youtubeKey = 'AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg';
var youtubeEl = $('.youtube');
var submitBtn = $('#submitBtn');

submitBtn.on("click", function (event) {
  event.preventDefault();
  
  getYoutube();
});

function getYoutube() {
youtubeEl.empty()
    var youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=radiohead&type=video&key=AIzaSyA174a2gY04tvmL5EB1EP4iGnyHr4mVkOg'
    
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

