let addedMovies = []
let moviesfromLocalStorage = JSON.parse(localStorage.getItem("watchlist-movies"))
if(moviesfromLocalStorage)
{
    addedMovies = moviesfromLocalStorage

}

else
{
    addedMovies = []
}

export {addedMovies}