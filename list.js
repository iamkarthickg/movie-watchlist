
import {addedMovies} from './data.js'
import {getButtonNumber} from './utils.js'



let movieHtml = ""
const movieList = document.querySelector(`#watchlist-data`)
let moviesfromLocalStorage = JSON.parse(localStorage.getItem("watchlist-movies"))
let pos


if(moviesfromLocalStorage)
{
    let addedMovies2 = moviesfromLocalStorage
    console.log(moviesfromLocalStorage)
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

// Setting the proper ID

// let parentElArray = document.querySelectorAll(`.parent-container`)
// for(let i=0;i<parentElArray.length;i++)
// {
//     parentElArray[i].id = `parent-${i+1}`
// }

setProperId("parent")
setProperId("poster-img")
setProperId("title")
setProperId("rating")
setProperId("runtime")
setProperId("genre")
setProperId("watchlist-btn")
setProperId("watchlist-text")
setProperId("plot")

function setProperId(className)
{       
    let allClassNames = document.querySelectorAll(`.${className}`)
    for(let i=0;i<allClassNames.length;i++)
    {
        allClassNames[i].id = `${className}-${i+1}`
        console.log(allClassNames[i].id)
    }
    
}

// Setting the proper ID

if(moviesfromLocalStorage)
{
    movieList.addEventListener("click", event => {

    if((event.target.id).includes("watchlist"))
    {

        

        let clickedBtn = document.querySelector(`#${event.target.id}`)
        let idNumber = getButtonNumber(event.target.id)
        console.log(idNumber)
        let watchListTxtEl = document.querySelector(`#watchlist-text-${idNumber}`)        
        let posterEl = document.querySelector(`#poster-img-${idNumber}`)
        let parentEl = document.querySelector(`#parent-${idNumber}`)


        for(let i=0;i<moviesfromLocalStorage.length;i++)
        {
            if(posterEl.src === moviesfromLocalStorage[i].poster)
            {
                pos = i
                break
            }
        }

        parentEl.remove()

        moviesfromLocalStorage.splice(pos, 1)
        localStorage.setItem("watchlist-movies", JSON.stringify(moviesfromLocalStorage))
    }
        
})

}
   