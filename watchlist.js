// http://www.omdbapi.com/?i=tt3896198&apikey=c2a89583

// import addMovieToList from './list.js'
// import likedMovies from './list.js'
import { render, renderlikedMovies } from './render.js'
// import {addedMovies} from './data.js'



function Main()
{


async function getMovie()
{
    movieTitleResults = []
    let movieName = searchInputEl.value
    let response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c2a89583&s=${movieName}`)
    let data = await response.json()
    // console.log(data)
    searchInputEl.value = ""  
    if(data.totalResults)
    {
        console.log(data.Search)
        for(let i=0;i<data.Search.length;i++)
        {
            movieTitleResults.push(data.Search[i].Title)
        }
        render(movieTitleResults)
    }
    else
    {
        noMovieFound()
    }
        
}



function noMovieFound()
{
    console.log("No movie found")
    let dataEl = document.querySelector(`#data-id`)
    dataEl.innerHTML = 
    `
    <div class = "no-movie-found">
        Unable to find movies for your search query. Try searching for something else...
    </div>    
    `
}

function getButtonNumber(watchlistId)
{
    let idNumber
    let watchlistIdArray = watchlistId.split("")
    idNumber = watchlistIdArray.slice(14).join("")

    return idNumber
}




const searchBtnEl = document.querySelector(`#search-button-id`)
const searchInputEl = document.querySelector(`#search-input-id`)
const movieList = document.querySelector(`#data-id`)

let movieTitleResults = []


// Search Button
searchBtnEl.addEventListener("click", getMovie)

//Activating Search button after Enter is pressed in the input field
searchInputEl.addEventListener("keypress", event => {
    if(event.key==="Enter")
    {
        event.preventDefault()
        searchBtnEl.click()
    }
})

// Adding and removing movies to and from Watchlist
movieList.addEventListener("click", event => 
{
   if((event.target.id).includes("watchlist")) 
   {

   
    let clickedBtn = document.querySelector(`#${event.target.id}`)
    let hasMovie = false
    
           
                // console.log(event.target.id, clickedBtn.src)
                let idNumber = getButtonNumber(event.target.id)
                let watchListTxtEl = document.querySelector(`#watchlist-text-${idNumber}`)
                let posterEl = document.querySelector(`#poster-img-${idNumber}`)

                console.log(watchListTxtEl, idNumber)
                if(clickedBtn.classList.contains("add-state"))
                {
                    clickedBtn.src = "images/remove.png"
                    clickedBtn.classList.add("remove-state")
                    clickedBtn.classList.remove("add-state")
                    watchListTxtEl.textContent = "Remove"

                    let movieEl = document.querySelector(`#movie-${idNumber}`)
                    let Movie = {}
                    Movie.poster = document.querySelector(`#poster-img-${idNumber}`).src
                    Movie.title = document.querySelector(`#title-${idNumber}`).textContent.trim()
                    Movie.rating = document.querySelector(`#rating-${idNumber}`).textContent.trim()
                    Movie.runtime = document.querySelector(`#runtime-${idNumber}`).textContent.trim()
                    Movie.genre = document.querySelector(`#genre-${idNumber}`).textContent.trim()
                    Movie.plot = document.querySelector(`#plot-${idNumber}`).textContent.trim()
                    Movie.html = document.querySelector(`#movie-${idNumber}`).innerHTML

                    let moviesfromLocalStorage = JSON.parse(localStorage.getItem("watchlist-movies"))

                    if(moviesfromLocalStorage)
                    {
                        for(let i=0;i<moviesfromLocalStorage.length;i++)
                        {
                            if(posterEl.src === moviesfromLocalStorage[i].poster)
                            {
                                hasMovie = true
                            }
                        }

                    }

                    else
                    {
                        moviesfromLocalStorage = []
                    }

                   

                    if(!hasMovie)
                    {
                        moviesfromLocalStorage.unshift(Movie)

                    }

                    localStorage.setItem("watchlist-movies", JSON.stringify(moviesfromLocalStorage))
                    // likedMovies()
                }
                else 
                {
                    let pos
                    clickedBtn.src = "images/add.png"
                    clickedBtn.classList.add("add-state")
                    clickedBtn.classList.remove("remove-state")
                    watchListTxtEl.textContent = "Watchlist"

                    let idNumber = getButtonNumber(event.target.id)
                    let posterEl = document.querySelector(`#poster-img-${idNumber}`)



                   let moviesfromLocalStorage = JSON.parse(localStorage.getItem("watchlist-movies"))

                   if(moviesfromLocalStorage)
                   {
                    for(let i=0;i<moviesfromLocalStorage.length;i++)
                    {
                        if(posterEl.src === moviesfromLocalStorage[i].poster)
                        {
                            pos = i
                            break
                        }
                        
                    }

                   }
                    
                   

            
                    moviesfromLocalStorage.splice(pos, 1)
                    localStorage.setItem("watchlist-movies", JSON.stringify(moviesfromLocalStorage))

                }
    }       
})

}

Main()

// export default Main;
// export default addedMovies
