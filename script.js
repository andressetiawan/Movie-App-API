// JQUery response to API with Ajax
$('.search').on('click',function(){
$.ajax({
    url: 'http://www.omdbapi.com/?&apikey=749e5500&s='+$('.keyword').val(),
    success: response => {
        const movies = response.Search;
        if(movies === undefined){
            alert("Film tidak ditemukan");
        } else {
            let result = '';
            movies.map(movie =>{
                result += showMovieCards(movie.Title,movie.Year,movie.Poster,movie.imdbID);
            });
            $('.movie-box').html(result);

            $('.btn').on('click',function(){
                let result = '';
                const imdbID = $(this).data('id');
                $.ajax({
                    url: `http://www.omdbapi.com/?apikey=749e5500&i=${imdbID}`,
                    success : (response) =>{
                        title = `<h5 class="modal-title" id="movieDetailTitle">${response.Title}</h5>`
                        result = showDetails(response.Poster,response.Title,response.Director,response.Genre,response.Released,response.Plot)
                        $('.box-details').html(result);
                        $('.modal-header').html(title);
                    }
                });
            });
        }
    },

    error : (e)=>{
        console.log(e.responseText);
    }
});
});

function showDetails(img,title,director,genre,date,plot){
    return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${img}" class="img-fluid">
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item">Title : ${title}</li>
          <li class="list-group-item">Director : ${director}</li>
          <li class="list-group-item">Genre : ${genre}</li>
          <li class="list-group-item">Released : ${date}</li>
          <li class="list-group-item">Plot : ${plot}</li>
        </ul>
      </div>
    </div>
  </div>`
}
function showMovieCards(title, year, img, id){
    return `<div class="col-md-4 my-2">
    <div class="card">
      <img class="card-img-top" src="${img}">
      <div class="card-body">
        <p class="card-title">${title}</p>
        <h4 class="text-muted">${year}</h4>
        <a href="#" class="btn btn-primary" data-id =${id} data-toggle="modal" data-target="#movieDetail">Show details</a>
      </div>
    </div>
  </div>`;
}