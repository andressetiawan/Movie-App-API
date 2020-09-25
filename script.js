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
                result += showMovieCards(movie);
            });
            $('.movie-box').html(result);

            $('.btn').on('click',function(){
                let result = '';
                const imdbID = $(this).data('id');
                console.log(imdbID);
                $.ajax({
                    url: `http://www.omdbapi.com/?apikey=749e5500&i=${imdbID}`,
                    success : (response) =>{
                        title = `<h5 class="modal-title" id="movieDetailTitle">${response.Title}</h5>`
                        result = showDetails(response);
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

function showDetails(movie){
    return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${movie.Poster}" class="img-fluid">
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item">Title : ${movie.Title}</li>
          <li class="list-group-item">Director : ${movie.Director}</li>
          <li class="list-group-item">Genre : ${movie.Genre}</li>
          <li class="list-group-item">Released : ${movie.Released}</li>
          <li class="list-group-item">Plot : ${movie.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`
}
function showMovieCards(movie){
    return `<div class="col-md-4 my-2">
    <div class="card">
      <img class="card-img-top" src="${movie.Poster}">
      <div class="card-body">
        <p class="card-title">${movie.Title}</p>
        <h4 class="text-muted">${movie.Year}</h4>
        <a href="#" class="btn btn-primary" data-id =${movie.imdbID} data-toggle="modal" data-target="#movieDetail">Show details</a>
      </div>
    </div>
  </div>`;
}