var API_KEY = 'api_key=2bede944a35770fbd59cfeff397a4d71';
 
var BASE_URL = 'https://api.themoviedb.org/3';
 
var API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

var IMG_URL ='https://image.tmdb.org/t/p/w500'

var searchURL = BASE_URL + '/search/movie?' +API_KEY;


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");





function getmovies(url){
    fetch(url).then(res => res.json())
    .then(data => {
        showmovies(data.results);
    }); 
}



function showmovies(movies){
    //clear main
    main.innerHTML = "";
    movies.forEach(movie =>{
        const { poster_path, title , vote_avarage, overview} =movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img
            src="${IMG_URL + poster_path}"
            alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(
                vote_avarage
                )}">${vote_avarage}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieEl);
    });
}


getmovies(API_URL);

function getClassByRate(vote){
    if (vote >= 8){
        return "green";
    }else if(vote >= 5){
        return "orange";
    }else{
        return "red";
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getmovies(searchURL + '&query=' + searchTerm);
    } else {
        getmovies(API_URL);
    }
});
