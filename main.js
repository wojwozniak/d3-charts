// Links to data
const KICKSTARTER_PLEDGES = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const MOVIE_SALES = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const VIDEOGAME_SALES = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";


// Get data from API
Promise.all([d3.json(KICKSTARTER_PLEDGES), d3.json(MOVIE_SALES), d3.json(VIDEOGAME_SALES)])
    .then((data) => renderChart(data[0], data[1], data[2]))
    .catch((err) => console.log(err));


//D3 main function
function renderChart(kickstarter, movies, videogames) {
    // Log data from API
    console.log(kickstarter);
    console.log(movies);
    console.log(videogames);
}