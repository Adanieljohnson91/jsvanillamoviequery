import {consoleSomething} from "./main.js"

const API = "8dbfe105d8f65baeb5b30d313542744e"
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API}&size=1&query=`

let movies;

const wireUp =  () =>{
   setMagicButton()
   setMovieSearch()
   
}

const setMagicButton =() =>{
    document.getElementById("magic-button").addEventListener('click',async (e)=>{
    e.preventDefault()
    let data = await getData()
    let cards = data.map(cardMapper)
    document.getElementById("cards").innerHTML = cards
    }) 
}

const setMovieSearch = () =>{
 document.getElementById("movie-search").addEventListener('input', async (e) =>{
        let {value} = e.target;
        let {results: data} = await getMovieData(value)
        movies = data;
        let cards = data.map(movieMapper)
        document.getElementById("cards").innerHTML = cards
        addDeleteMovieEventListener()

    })
}

const addDeleteMovieEventListener = () =>{
    const movieButtons = document.querySelectorAll("#delete-movie");
        movieButtons.forEach(ele =>{
            ele.addEventListener('click', deleteMovie)
        })

}

const deleteMovie = (e)=>{
    const {name} = e.target
    const index = parseInt(name)
    movies.splice(index, 1)
    document.getElementById("cards").innerHTML = movies.map(movieMapperState)
    addDeleteMovieEventListener()
}

const getMovieData = (keyWord) =>{
    return fetch(searchURL+ `${keyWord}`)
    .then(res=>res.json())
}

const getData = () =>{
    return fetch('https://random-data-api.com/api/users/random_user?size=10')
    .then(res=>res.json())
}

const cardMapper = (data) => {
    const {
        avatar,
        first_name,
        last_name,
        date_of_birth,
        employment: {title}
    } = data;

    return `<div class="card shadow" style="width: 18rem;">
    <img class="card-img-top" src=${avatar} alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${first_name}</h5>
      <p class="card-text">${title}</p>
      <a href="#" id="delete-movie" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`
            
}
const movieMapperState = (data) =>{
    let startIndex = 0
    return movieMapper(data, startIndex)
}
const movieMapper = ({overview, popularity, poster_path, title, vote_average}, num) =>{
    const imgAddress = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`
    
    return `<div class="card shadow" style="width: 18rem;">
    <img class="card-img-top" src=${imgAddress} alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${overview}</p>
      <small>Popularity: ${popularity}</small>
      <small>Vote: ${vote_average} </small>
      <button class="btn-danger" name="${num++}" id="delete-movie"> Delete</button>
    </div>
  </div>`
}

(function start(){
    wireUp()
    consoleSomething()
})()