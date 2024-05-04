// To differentate who requests we use --> API KEY
const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function getMovies(url) {
  // Using Promise(res)-> readable byte/stream covert to JSON.
  // Then JSON convert into data.
  fetch(url)
    .then((res) => res.json())
    .then((data) => showMovies(data.results));
}

function showMovies(data) {
  console.log(data)
  if(data){
  //data is an array
  main.innerHTML="";
  data.forEach((movie) => {
    const {title, poster_path, vote_average,overview} = movie;
    const movieEl=document.createElement("div");
    movieEl.classList.add('movie');
    movieEl.innerHTML=`
    <img  id="image" src="${IMG_URL + poster_path}" onerror='this.src="https://freedesignfile.com/upload/2014/07/Movie-time-design-elements-vector-backgrounds-04.jpg"'>
    <div class="movie-info">
      <h3>${title}</h3>
      <span>${vote_average}</span>
    </div>
    <div class="overview">
      ${overview}
    </div>`;
    main.appendChild(movieEl);
  })
  }if(data.length==0){
    main.innerHTML="";
    const movieEl=document.createElement("div");
    movieEl.classList.add('empty');
    movieEl.innerHTML=`<h2 id=error">Sorry!!! Movie Is Not Available</h2>`;
    main.appendChild(movieEl);
  };
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  }
});
