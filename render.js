// import Main from './watchlist.js'

import {addedMovies} from './data.js'

function renderlikedMovies()
{
    
            let movieHtml = ""
            const movieList = document.querySelector(`#watchlist-data`)
            let moviesfromLocalStorage = JSON.parse(localStorage.getItem("watchlist-movies"))
            if(moviesfromLocalStorage)
                {
                    let addedMovies2 = moviesfromLocalStorage
                    for(let i=0;i<addedMovies2.length;i++)
                    {
                        const blockContainerEl = document.createElement("div")
                        blockContainerEl.classList.add("block-container")

                        movieHtml += addedMovies2[i].html

                        blockContainerEl.innerHTML = movieHtml
                        
                        movieList.innerHTML = ""
                        movieList.style.display = "block"
                        movieList.appendChild(blockContainerEl)
                    }
                }
        
}

async function render(movies)
{
    const movieList = document.querySelector(`#data-id`)
    const blockContainerEl = document.createElement("div")
    blockContainerEl.classList.add("block-container")
    let movieHtml = ""
   

    for(let i=0;i<movies.length;i++)
    {
        // console.log(movies)
        let response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=c2a89583&t=${movies[i]}`)
        let data = await response.json()
        // console.log(`${data.Plot}`)
        let titleParam = data.Title.replace(" ", "_")
        movieHtml += 
        `
    <div class="holder" id=movie-${i+1}>

        <div class="parent" id="parent-${i+1}">

    
        <div class="movie-container">

            <div class="poster">
                <img src=${data.Poster} alt="" class="poster-img" id="poster-img-${i+1}">
            </div>

            <div class="movie-details">

                <div class="title-container">

                    <div class="movie-title" id="title-${i+1}">
                       ${data.Title}
                    </div>

                    <div class="rating-container">

                        <div class="rating">
                            <img src="images/star-rating.png" alt="" class="rating-img">
                        </div>
    
                        <div class="rating-number" id="rating-${i+1}">
                           ${data.imdbRating}
                        </div>

                    </div>                    

                </div>


                <div class="movie-meta">

                    <div class="duration" id="runtime-${i+1}">
                        ${data.Runtime}
                    </div>

                    <div class="genre" id="genre-${i+1}">
                        ${data.Genre}
                    </div>

                    <div class="add-to-watchlist">

                        <img src="images/add.png" alt="" class="watchlist-btn add-state" id="watchlist-btn-${i+1}">

                        <div class="watchlist-text" id="watchlist-text-${i+1}">
                            Watchlist
                        </div>

                    </div>

                    
                </div>


                <div class="plot" id="plot-${i+1}">                    
                    ${data.Plot.substr(0, 150) + "..." + `<a href="https://en.wikipedia.org/wiki/${titleParam}_(film)">read more</a>`}
                </div>

            </div>  

        </div>

        <div class="seperator">
        </div>    

    </div>

</div>
    `

    }
    blockContainerEl.innerHTML = movieHtml
    movieList.innerHTML = ""
    movieList.style.display = "block"
    movieList.appendChild(blockContainerEl)
}
export {render, renderlikedMovies}