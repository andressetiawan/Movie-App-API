const title = document.querySelector('.modal-header');
const detailBox = document.querySelector('.box-details');
const movieBox = document.querySelector('.movie-box');
const search = document.querySelector('.search');
const keywordForm = document.querySelector('.keyword');
const btnDetails = document.querySelectorAll('.details');

search.addEventListener('click',function(){
    let keyword = keywordForm.value;
    fetch(`http://www.omdbapi.com/?&apikey=749e5500&s=${keyword}`)
    .then( res => res.json())
    .then(movies =>{
        let result = '';
        movies.Search.map(movie=>{
            result += showMovieCards(movie);
        });
        movieBox.innerHTML = result;
    });
});

document.addEventListener('click',function(e){
    if(e.target.classList.contains('details')){
        const id = e.target.dataset.id;
        let result = '';
        fetch(`http://www.omdbapi.com/?&apikey=749e5500&i=${id}`)
            .then(res =>  res.json())
            .then(details => {
                result += showDetails(details);
                detailBox.innerHTML = result;
                title.innerHTML = details.Title;
            })
    }
});


function showMovieCards(movie){
    return `<div class="col-md-4 my-2">
    <div class="card">
      <img class="card-img-top" src="${movie.Poster}">
      <div class="card-body">
        <p class="card-title">${movie.Title}</p>
        <h4 class="text-muted">${movie.Year}</h4>
        <a href="#" class="btn btn-primary details" data-id =${movie.imdbID} data-toggle="modal" data-target="#movieDetail">Show details</a>
      </div>
    </div>
  </div>`;
}

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
