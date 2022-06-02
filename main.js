// Links to data
const KICKSTARTER_PLEDGES = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const MOVIE_SALES = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const VIDEOGAME_SALES = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

// Data selection buttons
const videogames_link = document.getElementById("videogames-link");
const movies_link = document.getElementById("movies-link");
const kickstarter_link = document.getElementById("kickstarter-link");

// Title and subtitle selection
const title = document.getElementById("title");
const subtitle = document.getElementById("description");

// Received data
let kickstarter = {};
let movies = {};
let videogames = {};

// Declare dataset
let dataset = [];

// Get data from API
Promise.all([d3.json(KICKSTARTER_PLEDGES), d3.json(MOVIE_SALES), d3.json(VIDEOGAME_SALES)])
    .then((data) => {
        kickstarter = data[0];
        movies = data[1];
        videogames = data[2];
        main();
        
    })
    .catch((err) => console.log(err));


// Adding text to buttons
const renderButtons = () => {
    videogames_link.textContent = "Video Games Chart";
    movies_link.textContent = "Movie Chart";
    kickstarter_link.textContent = "Kickstarter Chart";
}

// Main function
function main() {
    // Default dataset
    dataset = videogames.children;

    //Render buttons and default chart
    renderButtons();
    renderChart(dataset);
}

// D3
function renderChart(dataset) {
    console.log(dataset);
}

// Click listeners - setting data to selected by user, displaying correct title and subtitle and then calling renderChart function
videogames_link.onclick = () => {
    dataset = videogames.children;
    title.textContent = "Video Game Sales";
    subtitle.textContent = "Top 100 Most Sold Video Games by Platform"
    renderChart(dataset);
}
movies_link.onclick = () => {
    dataset = movies.children;
    title.textContent = "Movies Box Office";
    subtitle.textContent = "Top 100 Movies with Highest Gross Income"
    renderChart(dataset);
}
kickstarter_link.onclick = () => {
    dataset = kickstarter.children;
    title.textContent = "Kickstarter Top Funded Projects";
    subtitle.textContent = "Top 100 Most Funded Kickstarter Projects"
    renderChart(dataset);
}
