
// Links to data
const EDUCATION_LINK = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY_LINK = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

// D3
// Contact with API

Promise.all([d3.json(COUNTY_LINK), d3.json(EDUCATION_LINK)])
    .then((data) => renderChart(data[0], data[1]))
    .catch((err) => console.log(err));
  

function renderChart(counties, education) {
    
    // Logging data
    console.log(counties);
    console.log(education);

    // Chart constants
    const w = 600;
    const h = 440;


    const visual = d3.select("#visHolder")
        .append("svg")
        .attr("width", w)
        .attr("height, h")
    
}